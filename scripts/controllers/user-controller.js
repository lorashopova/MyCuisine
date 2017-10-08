import 'jquery';
import toastr from 'toastr';
import { templates } from 'templates';
import { userModel } from 'userModel';
import { appModel } from 'appModel';
// import { Validator } from 'validators';

const userController = (function() {
    class UserController {
        constructor(templates, userModel) {
            this.templates = templates;
            this.userModel = userModel;
        }

        registerAction(selector, name, username, email, password) {
            $(selector).empty();
            $('#carouselIndicators').addClass('hidden');
            $('.footer-aside').removeClass('hidden');
            $('.home-view').addClass('hidden');
            userModel.register(name, username, email, password).then((userInfo) => {
                userModel.saveSession(userInfo);
                toastr.success('User registration successful!');
                this.viewChangesAuth();
                location.hash = '#/home';
            }).catch((err) => {
                toastr.error();
            });
        }

        getLogInForm(selector) {
            let resultPosts;
            let resultComments; 
            $(selector).empty();
            $('#carouselIndicators').addClass('hidden');
            $('#content-header').removeClass('hidden');
            $('header').css('backgroundImage', 'url("../images/header-bg.png")');
            $('header').css('height', '250px');
            $('.footer-aside').removeClass('hidden');
            $('.home-view').addClass('hidden');
            this.templates.getTemplate('login-form').then((responseTemplate) => {
                selector.html(responseTemplate());
                $('.container-fluid .content-title').text('Member login');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
            }).then(() => {
                appModel.getMeal().then((data) => {
                    const recent = data.slice(0, 7);
                    resultPosts = {
                        recentPosts: recent
                    };
                    return templates.getTemplate('recent-posts');
                }).then((template) => {
                    $('.list-posts').html(template(resultPosts));
                });
            }).then(() => {
                appModel.getAllComments().then((data) => {
                    const recent = data.slice(0, 7);
                    resultComments = {
                        recentComments: recent
                    };
                    return templates.getTemplate('recent-comments');
                }).then((template) => {
                    $('.list-comments').html(template(resultComments));
                });
            }).catch((error) => {
                toastr.error();
            });
        }

        loginAction(selector, username, password) {
            $(selector).empty();
            $('#carouselIndicators').addClass('hidden');
            userModel.login(username, password).then((userInfo) => {
                userModel.saveSession(userInfo);
                toastr.success('User login successful!');
                this.viewChangesAuth();
                location.hash = '#/home';
            }).catch((err) => {
                toastr.error();
            });
        }

        logout() {
            userModel.logout().then(() => {
                localStorage.clear();
                toastr.success('Logout successful!');
                this.viewChangesAuth();
                location.hash = '#/home';
            });
        }

        viewChangesAuth() {
            if (this.userModel.isAuthed()) {
                $('#login').addClass('hidden');
                $('#logout').removeClass('hidden');
            } else {
                $('#logout').addClass('hidden');
                $('#login').removeClass('hidden');
            }
        }
    }
    return new UserController(templates, userModel);
}());

export { userController };
