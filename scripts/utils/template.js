import Handlebars from 'handlebars';
import handlebars from 'handlebars';
import 'jquery';

class HandlebarsTemplates {
    constructor() {
        this.cache = {};
    }

    getTemplate(name) {
        const cache = this.cache;
        const _this = this;
        return new Promise((resolve, reject) => {
            if (cache[name]) {
                resolve(cache[name]);
            } else {
                $.get(`../../templates/${name}.handlebars`, (templateHtml) => {
                    const template = handlebars.compile(templateHtml);
                    cache[name] = template;
                    resolve(template);
                });
                _this.cache = cache;
            }
        });
    }
}

const templates = new HandlebarsTemplates();

export { templates };
