Package.describe({
  name: 'perfectsofttunisia:autoform-multiple-file-upload',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use(['ecmascript', 'templating', 'reactive-var'], 'client');

  api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0', {weak: true});
  api.use('perfectsofttunisia:autoform@4.0.0 || 5.0.0 || 6.0.0', {weak: true});

  api.addFiles([
    'multiple-file-upload.html',
    'multiple-file-upload.js',
    'input-type-config.js',
  ], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('perfectsofttunisia:autoform-multiple-file-upload');
  api.mainModule('autoform-multiple-file-upload-tests.js');
});
