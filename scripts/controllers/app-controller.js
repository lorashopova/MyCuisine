import 'jquery';
import toastr from 'toastr';
import { appModel } from 'appModel';
import { templates } from 'templates';
import { pagination } from 'pagination';
const PAGE_SIZE_GALLERY = 9;
const PAGE_SIZE_BLOG = 4;


const appController = (function() {
    class AppController {
        constructor(templates, appModel) {
            this.templates = templates;
            this.appModel = appModel;
        }

        getHomePage(selector, category) {
            $(selector).empty();
            $('#carouselIndicators').removeClass('hidden');
            $('.slider-shadow').removeClass('hidden');
            $('#content-header').addClass('hidden');
            $('header').css('height', '465px');
            $('header').addClass('homeH');            
            $('.footer-aside').addClass('hidden');
            $('.home-view').removeClass('hidden');
            let result;
            this.appModel.getMealByCategory(category).then((data) => {
                // console.log(Object.keys(data)); // returns elements ids
                result = {
                    meal: data
                };
                return templates.getTemplate('home');
            this.templates.getTemplate('home')
            }).then((responseTemplate) => {
                selector.html(responseTemplate(result));
            }).catch((error) => {
                toastr.error('Unable to display meal!');
                location.hash = '#/home';
            });
        }

        getLocation(selector) {
            $(selector).empty();
            this.viewChanges();
            this.templates.getTemplate('location').then((responseTemplate) => {
                selector.html(responseTemplate());
                $('.container-fluid .content-title').text('Store Location');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
            }).catch((error) => {
                toastr.error('Unable to display location!');
                location.hash = '#/home';
            });
        }
 
        //dbRef.orderByChild("age").equalTo("4").once(),
        //dbRef.orderByKey().equalTo("-M0FIuRBi5NT1VKsTbQt").once(),
        getContactUs(selector) {
            $(selector).empty();
            let resultPosts;
            let resultComments;            
            this.viewChanges();
            this.templates.getTemplate('contactus').then((responseTemplate) => {
                selector.html(responseTemplate());
                $('.container-fluid .content-title').text('Contact Us');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
            }).then(() => {
                this.searchByTitle(selector);
            }).then(() => {
                this.appModel.getMeal().then((items) => {
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
                this.appModel.getSidebarComments().then((items) => {
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
                toastr.error('Unable to display form!');
                location.hash = '#/home';
            });
        }

        contactUsAction(selector, name, email, subject, text) {
            $(selector).empty();
            this.viewChanges();
            appModel.postMessage(name, email, subject, text).then((info) => {
                toastr.success('Your message was send successfuly!');
                location.hash = '#/home';
            }).catch((error) => {
                toastr.error('Send your message again.');
            });
        }

        getMenu(selector) {
            $(selector).empty();
            this.viewChanges();
            let result;
            this.appModel.getMeal().then((items) => {
                const data = Object.values(items);
                const recommendations = data.filter((m) => m.category === 'Chef\'s recommendations');
                const salads = data.filter((m) => m.category === 'Salads');
                const starters = data.filter((m) => m.category === 'Starters');
                const seafood = data.filter((m) => m.category === 'Seafood');
                const maindishes = data.filter((m) => m.category === 'Main Dishes');
                const desserts = data.filter((m) => m.category === 'Desserts');
                const beverages = data.filter((m) => m.category === 'Beverages');
                result = {
                    recommendations,
                    salads,
                    starters,
                    seafood,
                    maindishes,
                    desserts,
                    beverages
                };
                return templates.getTemplate('main-menu');
            }).then((responseTemplate) => {
                selector.html(responseTemplate(result));
                $('.container-fluid .content-title').text('Menu');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
            }).then(() => {
                this.searchByTitle(selector);
            }).catch((error) => {
                toastr.error('Unable to display menu!');
                location.hash = '#/home';
            });
        }

        getGallery(selector, pageNumberParam) {
            $(selector).empty();
            this.viewChanges();
            let result;
            const pageNumber = pageNumberParam;
            let imagesOnPageArray;
            let pageIndeces;
            this.appModel.getMeal().then((items) => {
                const data = Object.values(items);
                imagesOnPageArray = pagination.createImagesOnPage(data, pageNumber, PAGE_SIZE_GALLERY);
                pageIndeces = pagination.createPageIndeces(data, PAGE_SIZE_GALLERY);
                result = {
                    meal: imagesOnPageArray,
                    indeces: pageIndeces
                };
                return templates.getTemplate('gallery');
            }).then((responseTemplate) => {
                selector.html(responseTemplate(result));
                $('.container-fluid .content-title').text('Gallery');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
            }).then(() => {
                this.searchByTitle(selector);
            }).catch((error) => {
                toastr.error('Unable to display gallery!');
                location.hash = '#/home';
            });
        }

         getMenuByCategory(selector, category) {
            $(selector).empty();
            this.viewChanges();
            let result;
            let resultPosts;
            let resultComments; 
            this.appModel.getMealByCategory(category).then((data) => {
                result = {
                    menu: data
                };
                return templates.getTemplate('menu-category');
            }).then((responseTemplate) => {
                selector.html(responseTemplate(result));
                $('.container-fluid .content-title').text('Menu');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
            }).then(() => {
                this.searchByTitle(selector);
            }).then(() => {
                this.appModel.getMeal().then((items) => {
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
                this.appModel.getSidebarComments().then((items) => {
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
                toastr.error('Unable to display meal!');
                location.hash = '#/home';
            });
        }

        getBlog(selector, pageNumberParam) {
            $(selector).empty();
            this.viewChanges();
            let result;
            let resultPosts;
            let resultComments; 
            const pageNumber = pageNumberParam;
            let imagesOnPageArray;
            let pageIndeces;
            this.appModel.getMeal().then((items) => {
                const data = Object.values(items);
                imagesOnPageArray = pagination.createImagesOnPage(data, pageNumber, PAGE_SIZE_BLOG);
                pageIndeces = pagination.createPageIndeces(data, PAGE_SIZE_BLOG);
                result = {
                    meal: imagesOnPageArray,
                    indeces: pageIndeces
                };
            return templates.getTemplate('blog');
            }).then((responseTemplate) => {
                selector.html(responseTemplate(result));
                $('.container-fluid .content-title').text('Blog');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');              
            }).then(() => {
                this.searchByTitle(selector);
            }).then(() => {
                this.appModel.getMeal().then((items) => {
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
                this.appModel.getSidebarComments().then((items) => {
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
                toastr.error('Unable to display page!');
                location.hash = '#/home';
            });
        }
 
        getByTitle(selector, title) {
            $(selector).empty();
            this.viewChanges();
            let result;
            let resultComment;
            let resultPosts;
            let resultComments; 
            this.appModel.getMealByTitle(title).then((data) => {
                result = Object.values(data)[0];
                return templates.getTemplate('post');
            }).then((responseTemplate) => {
                selector.html(responseTemplate(result));
                this.viewChangesAuth();
                $('.container-fluid .content-title').text('Menu');
                $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
                this.appModel.getComments(title).then((data) => {
                    resultComment = {
                        comments: Object.values(data)
                    };
                    return templates.getTemplate('comments');
                }).then((template) => {
                    $('.single-comment').html(template(resultComment));
                });
            }).then(() =>{
                this.searchByTitle(selector);
            }).then(() => {
                this.appModel.getMeal().then((items) => {
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
                this.appModel.getSidebarComments().then((items) => {
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
                toastr.error('Unable to display meal!');
                location.hash = '#/home';
            });
        }

        commentsAction(selector, comment, date, name, mealTitle) {
            $(selector).empty();
            this.viewChanges();
            appModel.postComment(comment, date, name, mealTitle).then((data) => {
                console.log(data);
                toastr.success('Your comment was added successfuly!');
                location.reload();
            }).catch((error) => {
                toastr.error('Send your comment again.');
            });
        }

        viewChanges() {
            $('#carouselIndicators').addClass('hidden');
            $('.slider-shadow').addClass('hidden');
            $('#content-header').removeClass('hidden');
            $('header').css('backgroundImage', 'url("../images/header-bg.png")');
            $('header').css('height', '260px');
            $('header').removeClass('homeH');
            $('.footer-aside').removeClass('hidden');
            $('.home-view').addClass('hidden');
        }

        viewChangesAuth() {
            if (this.appModel.isAuthed()) {
                $('.not-auth').addClass('hidden');
                $('.is-auth').removeClass('hidden');
            } else {
                $('.not-auth').removeClass('hidden');
                $('.is-auth').addClass('hidden');
            }
        }

        searchByTitle(selector){
            let resultSearch;
            $('#search-btn').on('click', () => {
                    const title = $('#search-input').val();
                    $('#search-input').val('');
                    this.appModel.searchMealByTitle(title).then((dataSearch) => {
                        resultSearch = {
                            meal: dataSearch
                        };
                        return templates.getTemplate('blog');
                    }).then((responseTemplate) => {
                        selector.html(responseTemplate(resultSearch));
                        $('.container-fluid .content-title').text('Blog');
                        $('.container-fluid .content-subtitle').text('Lorem ipsum lorem ipsum');
                    }).catch((error) => {
                        toastr.error('Unable to display meal!');
                        location.hash = '#/home';
                    });
                });
        }
    }

    return new AppController(templates, appModel);
}());

export { appController };
