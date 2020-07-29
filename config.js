SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        'jquery': './node_modules/jquery/dist/jquery.js',
        'popper': './node_modules/popper.js/dist/popper.js',
        'bootstrap': './node_modules/bootstrap/dist/js/bootstrap.js',
        'handlebars': './node_modules/handlebars/dist/handlebars.js',
        'sammy': './node_modules/sammy/lib/sammy.js',
        'toastr': './node_modules/toastr/toastr.js',
        'moment': './node_modules/moment/moment.js',
        
        'app': './scripts/app.js',
        'templates': './scripts/utils/template.js',
        'pagination': './scripts/utils/pagination.js',        
        'userModel': './scripts/requests/authentication-requests.js',
        'appModel': './scripts/requests/app-requests.js',
        'userController': './scripts/controllers/user-controller.js',
        'appController': './scripts/controllers/app-controller.js'
    }
});

System.import('app');