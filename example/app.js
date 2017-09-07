
$(function(){
    
        // Create a model for the services
        var Service = Backbone.Model.extend({
    
            // Will contain three attributes.
            // These are their default values
    
            defaults:{
                title: '',
                price: 0,
                checked: false
            },

            intialize: function(options) {
                options = (options || {});
                this.$log('Service::initialize');
            },
    
            // Helper function for checking/unchecking a service
            toggle: function(){
                this.set('checked', !this.get('checked'));
                this.$log(this.get('title') + ' - checked - ' + this.get('checked'));
            }
        });
    
        // Create a collection of services
        var ServiceList = Backbone.Collection.extend({
    
            // Will hold objects of the Service model
            model: Service,

            initialize: function(options) {
                options = (options || {});
                this.$log('ServiceList::initialize');
            },
    
            // Return an array only with the checked services
            getChecked: function() {
                return this.where({checked:true});
            }
        });
    
        // Prefill the collection with a number of services.
        var services = new ServiceList([
            new Service({ title: 'backbone.js development', price: 100}),
            new Service({ title: 'angular 1.x development', price: 150}),
            new Service({ title: 'python development', price: 100}),
            new Service({ title: 'coffee drinking', price: 10})
        ]);
    
        // This view turns a Service model into HTML. Will create LI elements.
        var ServiceView = Backbone.View.extend({
            tagName: 'li',
    
            events:{
                'click': 'toggleService'
            },
    
            initialize: function(){

                this.$log('ServiceView::initialize');


                // Set up event listeners. The change backbone event
                // is raised when a property changes (like the checked field)
    
                this.listenTo(this.model, 'change', this.render);
            },
    
            render: function() {
    
                // Create the HTML
                this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + 
                    this.model.get('title') + 
                    '<span>$' + this.model.get('price') + '</span>');
            

                this.$('input').prop('checked', this.model.get('checked'));
    
                this.$log('serviceview::render');
                // Returning the object is a good practice
                // that makes chaining possible
                return this;
            },
    
            toggleService: function() {
                this.model.toggle();
            }
        });
    
        // The main view of the application
        var AppView = Backbone.View.extend({
    
            // Base the view on an existing element
            el: $('#root'),
    
            initialize: function() {

                this.$logEnabled(false);
                this.$log('app::initialize');
    
                // Cache these selectors
                this.total = $('#total span');
                this.list = $('#services');
    
                // Listen for the change event on the collection.
                // This is equivalent to listening on every one of the 
                // service objects in the collection.
                this.listenTo(services, 'change', this.render);
    
                // Create views for every one of the services in the
                // collection and add them to the page
    
                services.each(function(service) {
    
                    var view = new ServiceView({ model: service });
                    this.list.append(view.render().el);
    
                }, this);   // "this" is the context in the callback
            },
    
            render: function() {
    
                // Calculate the total order amount by agregating
                // the prices of only the checked elements
    
                var total = 0;
    
                _.each(services.getChecked(), function(elem) {
                    total += elem.get('price');
                });
    
                // Update the total price
                this.total.text('$'+total);

                this.$log('App::render');
    
                return this;
            }
        });
    
        var router = Backbone.Router.extend({
            routes: {
                '*defaultActions': 'defaultRoute'
            },

            intialize: function(options) {
                options = (options || {});
                this.$log('router::initialize');
            },

            defaultRoute: function() {
                this.$log('logging a simple string');
                
                var obj = {
                    a: 1,
                    b: 2,
                    c: 3
                };

                this.$log('logging a simple object ', obj);

                var value = 2.50;
                this.$log('logging a simple value ', value);

                this.currentPage = new AppView();
            }
        });

        new router();

        Backbone.history.start();

    });
