angular.module('storyCtrl', ['storyService'])
	.controller('StoryController', function(Story, socketio) {
		var vm = this;

		Story.all()
			.success(function(data) {
				vm.stories = data;
			});

		vm.createStory = function() {
			vm.message = '';
			console.log('createStory called');
			Story.create(vm.storyData)
				.success(function(data) {
					//clear the form
					vm.storyData = {};
					
					vm.message = data.message;
					vm.stories.push(data);
				});
		};

		socketio.on('story', function(data) {
			vm.stories.push(data);
		});
	})

	.controller('AllStoriesController', function(stories, socketio) {
		var vm = this;

		vm.stories = stories.data;

		socketio.on('story', function(data) {
			vm.stories.push(data);
		});
	});