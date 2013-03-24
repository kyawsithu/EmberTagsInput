Tags = Ember.Application.create();

Tags.Tag = Ember.Object.extend({
	id: null,
	title: null
});

Tags.Controller = Ember.Object.create({
	tags: Ember.A(),

	init: function() {
		var items = this.get('tags');
		items.addObject(Tags.Tag.create({id: ID(), title: 'Example'}));
		items.addObject(Tags.Tag.create({id: ID(), title: 'Sample'}));
	},

	createTag: function(title) {
		this.get('tags').addObject(Tags.Tag.create({id: ID(), title: title}));
	},

	removeTag: function(id) {
		this.get('tags').removeObject(this.get('tags').findProperty('id', id));
	}
});

Tags.TagController = Ember.ObjectController.extend({
	isEditing: false,

	removeTag: function () {
		Tags.Controller.removeTag(this.get('id'));
	}
});

Tags.CreateTagView = Ember.TextField.extend({
	insertNewline: function() {
		var value = this.get('value');
		if (value) {
			Tags.Controller.createTag(value);
			this.set('value', '');
		}
	}
});