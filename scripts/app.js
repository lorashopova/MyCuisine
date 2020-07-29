import 'jquery';
import Sammy from 'sammy';
import toastr from 'toastr';
import { userController } from 'userController';
import { appController } from 'appController';
import { userModel } from 'userModel';

const app = app || {};

(function() {
    app.router = Sammy(function() {
        const selector = $('#wrapper');

        this.get('#/', function() {
            this.redirect('#/home');
        });

        this.get('#/home', () => {
            const category = 'Chef\'s recommendations';
            appController.getHomePage(selector, category);
        });

        this.post('#/register', function() {
            const email = this.params.email;
            const password = this.params.password;
            const confirmPassword = this.params.confirmPassword;
            userController.registerAction(selector, email, password);
        });

        this.get('#/login', () => {
            userController.getLogInForm(selector);
        });

        this.post('#/login', function() {
            const email = this.params.email;
            const password = this.params.password;
            userController.loginAction(selector, email, password);
        });

        this.get('#/logout', () => {
            userController.logout();
        });

        this.get('#/location', () => {
            appController.getLocation(selector);
        });

        this.get('#/contactus', () => {
            appController.getContactUs(selector);
        });

        this.post('#/contactus', function() {
            const name = this.params.name;
            const email = this.params.email;
            const subject = this.params.subject;
            const text = this.params.text;
            appController.contactUsAction(selector, name, email, subject, text);
        });

        this.get('#/blog/?:pageNumber', function() {
            const pageNumber = this.params.pageNumber;
            appController.getBlog(selector, pageNumber);
        });

        this.get('#/menu', () => {
            appController.getMenu(selector);
        });

        this.get('#/menu/:category', function() {
            const category = this.params.category;
            appController.getMenuByCategory(selector, category);
        });

        this.get('#/meal/:title', function() {
            const title = this.params.title;
            appController.getByTitle(selector, title);
        });

        this.get('#/gallery/?:pageNumber', function() {
            const pageNumber = this.params.pageNumber;
            appController.getGallery(selector, pageNumber);
        });

        this.post('#/comments', function() {
            const comment = this.params.commentText;
            const date = new Date().toISOString().slice(0, 10);
            const name = localStorage.getItem('email');
            const pathname = window.location.hash;
            const searchedTitle = pathname.substring(window.location.hash.lastIndexOf('/') + 1);
            const mealTitle = decodeURI(searchedTitle);
            appController.commentsAction(selector, comment, date, name, mealTitle);
        });

        $('.navbar-nav a').on('click', function() {
            $('.navbar-nav').find('.active').removeClass('active');
            $(this).parent().addClass('active');
        });

        // if (userModel.isAuthed()) {
        //     $('#login').addClass('hidden');
        //     $('#logout').removeClass('hidden');
        // } else {
        //     $('#logout').addClass('hidden');
        //     $('#login').removeClass('hidden');
        // }
    });

    app.router.run('#/');
}());
