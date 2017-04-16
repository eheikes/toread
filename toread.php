<?php $config = parse_ini_file("toread.ini"); ?>
<!DOCTYPE html>
<html lang="en" ng-app="toRead">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="<?php echo $config['base_path']; ?>">
    <title>To-Read List</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
      .stats ins { color: red; text-decoration: none; }
      .stats del { color: green; text-decoration: none; }
      .strike { text-decoration: line-through; }
      .all-tags { margin-bottom: 0.5em; }
      .all-tags:after { content: ""; display: table; clear: both; }
      .all-tags .label { float: left; margin-bottom: 0.5em; }
      .snapshot { margin-left: 0.25em; }
      .description { white-space: pre-line; margin: 0 0 0 1.2em; }
      .label { margin-right: 0.25em; }
      .faded { opacity: 0.5; }
      .highlight { background: yellow; }
      ul.entries { margin-left: 0; padding-left: 0; }
      ul.entries li { list-style: none; padding: 0.15em 0.25em; }
      .controls > div { margin-bottom: 15px; }
      .search { width: 100%; }
      .search input { width: 100%; }
      #add-new-link { margin-bottom: 15px; }
      #add-new-link .text-danger { margin: 0.25em .5em; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h1><a href="<?php echo $_SERVER['REQUEST_URI']; ?>">To Read</a></h1>
          <list></list>
        </div>
        <div class="col-md-4">
          <form id="add-new-link" ng-controller="addController" ng-submit="submit()">
            <h2>Add New Link</h2>
            <fieldset ng-disabled="isSaving">
              <div class="form-group">
                <label for="new-url" title="Link URL">URL</label>
                <input id="new-url" type="text" name="url" ng-model="data.url" ng-model-options="{debounce: 500}" value="" class="form-control" accesskey="n">
                <div ng-show="isDuplicate" class="text-danger">
                  <span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
                  This link already exists<span ng-show="isDuplicateDeleted">
                  (but has been deleted)</span>.</div>
              </div>
              <div class="form-group">
                <label for="new-tags" title="Link tags (separate with commas)">Tags</label>
                <input id="new-tags" type="text" name="tags" ng-model="data.tags" value="" class="form-control">
              </div>
              <div class="form-group">
                <label for="new-description">Description</label>
                <textarea name="keywords" ng-model="data.keywords" rows="3" cols="50" placeholder="when saving a reference" class="form-control"></textarea>
              </div>
              <input type="submit" class="btn btn-default" value="Add">
              <div ng-show="saveFailed" class="text-danger">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                There was an error saving the link.
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-resource.min.js"></script>
    <script src="http://vitalets.github.io/checklist-model/checklist-model.js"></script>
    <script src="toread.js"></script>
  </body>
</html>
