<!DOCTYPE html>
<html lang="en" ng-app="toRead">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>To-Read List</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <style>
      .stats ins { color: red; text-decoration: none; }
      .stats del { color: green; text-decoration: none; }
      .strike { text-decoration: line-through; }
      .description { white-space: pre-line; margin: 0 0 0 1.2em; }
      .label { margin-right: 0.25em; }
      .faded { opacity: 0.5; }
      .highlight { background: yellow; }
      ul.entries { margin-left: 0; padding-left: 0; }
      ul.entries li { list-style: none; padding: 0.15em 0.25em; }
      #controls > div { margin-bottom: 15px; }
      #search { width: 100%; }
      #search input { width: 100%; }
      #add-new-link { margin-bottom: 15px; }
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
                <input id="new-url" type="text" name="url" ng-model="data.url" value="" class="form-control">
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
            </fieldset>
          </form>
        </div>
      </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-resource.min.js"></script>
    <script src="http://vitalets.github.io/checklist-model/checklist-model.js"></script>
    <script src="toread.js"></script>
  </body>
</html>
