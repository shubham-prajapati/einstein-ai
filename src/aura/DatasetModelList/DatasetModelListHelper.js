({
	getModels : function(component) {
		let that = this; //get access to extended methods

		let action = component.get("c.getAllModels");
		action.setParams({ "recordId" : component.get("v.recordId")});

		that.executeActionJSON(component, action)
			.then($A.getCallback(function (result){
				if (result.message){
					console.log(result.message); //that's an error!
				} else if (result.data){
					component.set("v.models", result.data.reverse());
				} else {
					console.log("no models returned");
				}
				component.set("v.done", true);
			}));
			//Object {message: "Unable to find entity with ID null"}message: "Unable to find entity with ID null"__proto__: Object

	},

	shouldRetry : function(component) {
		if (!component.get("v.done")){
			//console.log("returning true because done = " + component.get("v.done"));
			return true; //obviously our connection sucks
		}

		let models = component.get("v.models");
		if (models && models.length>0){
			for (let i=0; i<models.length; i++){
				if (models[i].status==='RUNNING' || models[i].status==='QUEUED'){
					return true;
				}
			}
		} else {
			return false;
		}
		return false;
	},

})