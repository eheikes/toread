<?php
  $config = parse_ini_file('toread.ini');

  // Retrieves the categories.
  function getCategories() {
    global $dbh;

    $categories = array();

    $sql = "SELECT * FROM link_categories ORDER BY id ASC";
    $cat_stmt = $dbh->query($sql);

    $i = 0;
    foreach ($cat_stmt as $cat)
    {
      $color = getColor($i++);
      $categories[] = array(
        'id' => $cat['id'],
        'name' => $cat['name'],
        'color' => $color,
        'contrastColor' => getContrastColor($color)
      );
    }

    return $categories;
  }

  // From http://24ways.org/2010/calculating-color-contrast
  function getContrastColor($hexcolor)
  {
    $hexcolor = ltrim($hexcolor, '#');
    $r = hexdec(substr($hexcolor,0,2));
    $g = hexdec(substr($hexcolor,2,2));
    $b = hexdec(substr($hexcolor,4,2));
    $yiq = (($r*299)+($g*587)+($b*114))/1000;
    return ($yiq >= 128) ? 'black' : 'white';
  }

  function getColor($index)
  {
    // Colors found on http://www.colorjack.com
    $palette = array(
      "45C7BA", "AC0339", "A9533A", "2B20A1", "F79E09", "B7078C",
      "23780A", "F2DEC4", "D6FFFC", "333333", "452223", "974ABA",
      "00374A", "FF00DD", "DCFE00", "8193AF", "4C010E", "8AABAF",
    );

    return '#' . $palette[$index];
  }

  // Retrieves the stats.
  function getStats() {
    global $dbh;

    $sql = "SELECT COUNT(*) FROM links WHERE keywords IS NULL AND DATE(created)='" . date("Y-m-d") . "'";
    $res = $dbh->query($sql);
    $todayAdded = $res->fetchColumn();

    $sql = "SELECT COUNT(*) FROM links WHERE keywords IS NULL AND DATE(deleted)='" . date("Y-m-d") . "'";
    $res = $dbh->query($sql);
    $todayDeleted = $res->fetchColumn();

    $sql = "SELECT COUNT(*) FROM links WHERE keywords IS NULL AND created > DATE_SUB(NOW(), INTERVAL 1 WEEK)";
    $res = $dbh->query($sql);
    $weekAdded = $res->fetchColumn();

    $sql = "SELECT COUNT(*) FROM links WHERE keywords IS NULL AND deleted > DATE_SUB(NOW(), INTERVAL 1 WEEK)";
    $res = $dbh->query($sql);
    $weekDeleted = $res->fetchColumn();

    return array(
      'addedToday'      => intval($todayAdded),
      'deletedToday'    => intval($todayDeleted),
      'addedThisWeek'   => intval($weekAdded),
      'deletedThisWeek' => intval($weekDeleted)
    );
  }

  // Builds SQL clauses for the "q" parameter.
  function getSearchQuery($searchString) {
    global $dbh;
    $searchString = (string)$searchString;

    if ($searchString == '') { return ' AND keywords IS NULL'; }

    $clauses = array();
    // $clauses = array("keywords IS NOT NULL");
    $words = preg_split('#\s+#', $searchString);
    foreach ($words as $word) {
      $escaped = $dbh->quote($word);
      $escaped = substr($escaped, 1, strlen($escaped) - 2); // remove surrounding quotes
      $clauses[] = "(title LIKE '%" . $escaped . "%' OR keywords LIKE '%" . $escaped . "%')";
    }

    return ' AND ' . implode(' AND ', $clauses);
  }

  // Builds SQL clauses for the "tag" parameter.
  function getTagQuery($tagId) {
    global $dbh;
    if (!isset($tagId)) { return ''; }

    $clauses = array(
      'link_categories.id=' . intval($tagId),
      'links_to_categories.category_id=link_categories.id',
      'links_to_categories.link_id=links.id',
    );

    return ' AND ' . join(' AND ', $clauses);
  }

  function getTables() {
    $tables = array('links');
    if (isset($_GET['tag'])) {
      array_push($tables, 'links_to_categories', 'link_categories');
    }
    return join(',', $tables);
  }

  // Retrieves the number of links.
  function getTotal() {
    global $dbh;

    $sql = "SELECT COUNT(*)"
         . " FROM (" . getTables() . ")"
         . " WHERE deleted IS NULL"
         . getSearchQuery(@$_GET['q'])
         . getTagQuery(@$_GET['tag']);
    $res = $dbh->query($sql);
    $numLinks = $res->fetchColumn();

    return intval($numLinks);
  }

  // Retrieves the links.
  function getEntry() {
    global $config, $dbh;

    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $count  = isset($_GET['count'])  ? intval($_GET['count'])  : 20;

    // Query the links.
    $selection = "links.*"
      . " , UNIX_TIMESTAMP(created) AS time"
      . " , UNIX_TIMESTAMP(created) AS created"
      . " , UNIX_TIMESTAMP(deleted) AS deleted"
      . " , url AS link";
    if (isset($_GET['check'])) {
      $sql = "SELECT $selection FROM links"
           . " WHERE url=" . $dbh->quote(@$_GET['url']);
    } else if (isset($_GET['finddups'])) {
      $sql = "SELECT $selection, COUNT(*) c FROM links"
           . " WHERE deleted IS NULL"
           . " AND keywords IS NULL"
           . " GROUP BY url HAVING c > 1"
           . " ORDER BY created DESC";
    } else {
      $sql = "SELECT $selection"
        . " FROM (" . getTables() . ")"
        . " WHERE 1=1"
        . getSearchQuery(@$_GET['q'])
        . getTagQuery(@$_GET['tag'])
        . (@$_GET['include_deleted'] ? "" : " AND deleted IS NULL")
        . (
          isset($_GET['since'])
            ? " AND (UNIX_TIMESTAMP(created) >= " . intval($_GET['since'])
              . " OR UNIX_TIMESTAMP(deleted) >= " . intval($_GET['since']) . ")"
            : ""
        )
        . " ORDER BY " . (isset($_GET['random']) ? "RAND()" : "created DESC")
        . " LIMIT $offset, $count";
    }
    $feed = $dbh->query($sql);

    // Add the links to an array.
    $links = array();
    foreach ($feed as $item) {
      // Query the tags (categories).
      $tagSql = "SELECT *"
              . " FROM link_categories, links_to_categories"
              . " WHERE link_categories.id = category_id"
              . " AND link_id = " . $item['id']
              . " ORDER BY name ASC";
      $tags = array();
      $tagData = $dbh->query($tagSql);
      foreach ($tagData as $tagInfo) {
        $tags[] = $tagInfo['name'];
      }

      $decodedTitle = html_entity_decode($item['title']);
      $decodedTitle = preg_replace_callback("/&#(x?)[0-9]+;/", function($m) {
        return mb_convert_encoding($m[0], 'UTF-8', 'HTML-ENTITIES');
      }, $decodedTitle);

      // Add the link info to the array.
      $links[] = array(
        'id'          => intval($item['id']),
        'title'       => $decodedTitle,
        'link'        => $item['link'],
        'description' => $item['keywords'],
        'hasSnapshot' => !is_null($item['snapshot']),
        'time'        => date('c', $item['time']),
        'created'     => $item['created'],
        'deleted'     => isset($_GET['since']) ? $item['deleted'] : !is_null($item['deleted']),
        'tags'        => $tags
      );
    }

    $response = array(
      'links' => $links,
      'total' => getTotal(),
      'tags'  => getCategories(),
      'stats' => getStats(),
    );
    if (isset($config['debug']) and
      $config['debug'] == 'on') {
      $response['query'] = $sql;
    }
    return $response;
  }

  function postEntry() {
    global $dbh;

    $maxTitleLength = 191;

    $postdata = file_get_contents("php://input");
    $POST = json_decode($postdata);
    $url = isset($POST->url) ? $POST->url : '';
    $keywords = isset($POST->keywords) ? trim($POST->keywords) : '';

    $response = array();

    // Retrieve the page title.
    $html = NULL; // default
    $title = htmlentities($url); // default
    if (function_exists("curl_init"))
    {
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_HEADER, false);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
      curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Accept-Encoding: identity" // turn off compression
      ));
      $result = curl_exec($ch);
      if ($result !== false)
      {
        // Look for a charset definition in the page.
        // Convert to UTF-8 if necessary.
        if (preg_match("#<meta[^<]*charset=([a-z0-9_-]+)#is", $result, $matches)) {
          if (strtolower($matches[1]) !== 'utf-8') {
            $result = mb_convert_encoding($result, 'UTF-8', $matches[1]);
          }
        }

        // Save the <title>.
        $cleanedHtml = preg_replace('#<script.*</script>#isU', '', $result);
        $cleanedHtml = preg_replace('#<style.*</style>#isU', '', $cleanedHtml);
        $cleanedHtml = preg_replace('#<svg.*</svg>#isU', '', $cleanedHtml);
        if (preg_match("#<title[^>]*>(.*)</title>#isU", $cleanedHtml, $matches)
        and $matches[1] != "")
        {
          $title = mb_substr($matches[1], 0, $maxTitleLength, 'UTF-8');
        }
        // Save the page, if it's HTML.
        if (stripos($result, '<html') !== false) {
          $html = $result;
        }
      }
    }

    // Add the link.
    $sql = "INSERT INTO links"
         . " SET created = NOW()"
         . " , url = " . $dbh->quote($url)
         . " , title = " . $dbh->quote($title)
         . " , snapshot = " . (is_null($html) ? "NULL" : $dbh->quote($html))
         . " , keywords = " . ($keywords == '' ? "NULL" : $dbh->quote($keywords));
    $success = $dbh->exec($sql);
    $response['success'] = (bool)$success;
    if (!$success) {
      $errInfo = $dbh->errorInfo();
      $errMessage = $errInfo[2];
      if ($errInfo[0]) {
        $errMessage .= " ({$errInfo[0]})";
      }
      $response['error'] = $errMessage;
    }

    // Parse the tags.
    $raw_tags = isset($POST->tags) ? $POST->tags : '';
    $tags = preg_split("#,#", $raw_tags, -1, PREG_SPLIT_NO_EMPTY);
    $tags = array_map("trim", $tags);

    // Add the tags.
    if ($success)
    {
      $link_id = $dbh->lastInsertId();
      $response['id'] = $link_id;
      foreach ($tags as $tag)
      {
        // Check if the category exists already.
        $category_id = null;
        $categories = getCategories();
        foreach ($categories as $cat)
        {
          if (strtolower($cat['name']) == strtolower($tag))
          {
            $category_id = $cat['id'];
            break;
          }
        }

        // Add the category if it doesn't exist.
        if (is_null($category_id))
        {
          $sql = "INSERT INTO link_categories"
               . " SET name = " . $dbh->quote($tag);
          $success = $dbh->exec($sql);
          if ($success)
          {
            $category_id = $dbh->lastInsertId();
          }
          else
          {
            continue; // go to next tag
          }
        }

        // Add the link/category association.
        $sql = "INSERT INTO links_to_categories"
             . " SET link_id = " . $link_id
             . " , category_id = " . $category_id;
        $dbh->exec($sql);
      }
    }

    return $response;
  }

  function deleteEntry() {
    global $dbh;

    $ids = isset($_GET['id']) ? (array)$_GET['id'] : array();
    $success = true;

    if (!empty($ids))
    {
      $ids = array_map('intval', $ids);

      // Delete the links.
      $sql = "UPDATE links SET deleted=NOW() WHERE id IN (" . implode(",", $ids) . ")";
      $success = $dbh->exec($sql);
    }

    return array('success' => $success, 'deleted' => $ids);
  }

  try {
    $dbh = new PDO(
      "mysql:dbname=" . $config['db_name'] . ";host=" . $config['db_host']. ";charset=utf8mb4",
      $config['db_user'], $config['db_pass']);
  } catch (Exception $e) {
    header("HTTP/1.0 500 Internal Server Error");
    echo "Could not connect to database: " . $e->getMessage();
    exit;
  }

  // Perform the request.
  $method = strtolower($_SERVER['REQUEST_METHOD']);
  $func = $method . 'Entry';
  $data = $func();

  header('Content-Type: application/json; charset=UTF-8');
  $encoded = json_encode($data);
  if (!$encoded) {
    $data['links'] = array(array(
      'id' => json_last_error(),
      'title' => 'API ERROR: ' . json_last_error_msg(),
      'link' => 'http://php.net/manual/en/function.json-last-error.php',
      'description' => null,
      'time' => date('c'),
      'created' => time(),
      'deleted' => false,
      'tags' => array()
    ));
    $data['total'] = 1;
    $encoded = json_encode($data);
  }
  echo $encoded;
?>