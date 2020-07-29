import 'jquery';
import toastr from 'toastr';
import { templates } from 'templates';
import { userModel } from 'userModel';
import { appModel } from 'appModel';

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

const userController = (function() {
    class UserController {
        constructor(templates, userModel) {
            this.templates = templates;
            this.userModel = userModel;
        }

        registerAction(selector, email, password, confirmPassword) {
            $(selector).empty();
            $('#carouselIndicators').addClass('hidden');
            $('.slider-shadow').addClass('hidden');
            $('.footer-aside').removeClass('hidden');
            $('.home-view').addClass('hidden');

            if(password !== confirmPassword){
                toastr.error('Please confirm correctly password');
                return;
            }

            userModel.register(email, password).then((userInfo) => {
                toastr.success('User registration successful!');
                userModel.changeAuthState();
                console.log(userInfo);
                location.hash = '#/home';
            }).catch((error) => {
                toastr.error('Invalid username or password!');
            });
        }

        getLogInForm(selector) {
            let resultPosts;
            let resultComments; 
            $(selector).empty();
            $('#carouselIndicators').addClass('hidden');
            $('.slider-shadow').addClass('hidden');
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
                appModel.getMeal().then((items) => {
                    const data = Object.values(items);
                    const recent = data.slice(0, 7);
                    resultPosts = {
                        recentPosts: recent
                    };
                    return templates.getTemplate('recent-posts');
                }).then((template) => {
                    $('.list-posts').html(template(resultPosts));
                });
            }).then(() => {
                appModel.getSidebarComments().then((items) => {
                    const data = Object.values(items);
                    const recent = data.slice(0, 7);
                    resultComments = {
                        recentComments: recent
                    };
                    return templates.getTemplate('recent-comments');
                }).then((template) => {
                    $('.list-comments').html(template(resultComments));
                });
            }).catch((error) => {
                toastr.error('');
            });
        }

        loginAction(selector, email, password) {
            $(selector).empty();
            $('#carouselIndicators').addClass('hidden');
            $('.slider-shadow').addClass('hidden');
            userModel.login(email, password).then((userInfo) => {
                toastr.success('User login successful!');
                userModel.changeAuthState();
                location.hash = '#/home';
            }).catch((error) => {
                toastr.error('Invalid username or password!');
                // location.hash = '#/login';
                location.reload(true);
            });
        }

        logout() {
            userModel.logout().then(() => {
                localStorage.clear();
                toastr.success('Logout successful!');
                location.hash = '#/home';
            });
        }
    }
    return new UserController(templates, userModel);
}());

export { userController };
