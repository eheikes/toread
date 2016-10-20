<?php
  $config = parse_ini_file('toread.ini');

  if (!isset($_GET['id'])) {
    header("HTTP/1.0 400 Bad Request");
    echo "Please specify a link ID.";
    exit;
  }

  try {
    $dbh = new PDO(
      "mysql:dbname=" . $config['db_name'] . ";host=" . $config['db_host'],
      $config['db_user'], $config['db_pass']);
  } catch (Exception $e) {
    header("HTTP/1.0 500 Internal Server Error");
    echo "Could not connect to database: " . $e->getMessage();
    exit;
  }

  $sql = "SELECT snapshot"
    . " FROM links"
    . " WHERE id=" . $dbh->quote($_GET['id'])
    . " LIMIT 1";
  $result = $dbh->query($sql);
  $snapshots = $result->fetchAll();
  if (empty($snapshots)) {
    header("HTTP/1.0 404 Not Found");
    echo "Could not find link with ID of " . $_GET['id'];
    exit;
  }

  header('Content-Type: text/html');
  echo $snapshots[0]['snapshot'] ? $snapshots[0]['snapshot'] : '<p>No snapshot found.</p>';
?>