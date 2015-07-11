var ligneClicked = true;
var regionClicked = '';
Template.test.events({
	'click .ligne' : function(){
		Session.set('edit-' + this, ligneClicked);
		regionClicked = this.toString();
		ligneClicked = !ligneClicked;
	}
});

Template.test.helpers({
	//on attribue à la variable regionObject la liste des regions
	//comme Meteor ne supporte pas le fonction distinct dans MongoDB, on a contourné cette requête 
	//afin d'obtenir la valeur des regions distincte à l'aide de la librairie underscore.js
	'regionObject': function(){				
		var data = BdPdv.find().fetch();
		var distinctData = _.uniq(data,false, function(d){return d.region});
		region = _.pluck(distinctData, "region");
		Session.get('regionCourante');
		cregion = region; 
		Session.set('regionCourante', cregion);
		return _.pluck(distinctData, "region");
	},
	'isRegion': function(regionObject,listPdv){
		Session.get('regionCourante');
		Session.get('pdvCourant');
		return  cregion === rcpdv;
	},
	'listPdv': function(region){
		allPdv = BdPdv.find().fetch();
		Session.get('pdvCourant');
		rcpdv = this.region;
		Session.set('pdvCourant', rcpdv);
		return allPdv;
	},
	'isClicked': function(){
		return Session.get('edit-' + this);
	}
});

Template.affiche.helpers({
	'allList': function(){
/*		var x ;
		var list = new Array();
		for(x in region){
			x="rabat";
			list.push(BdPdv.find({ region: 'rabat'}).fetch());
			return list; 
		} 
*/
		
/*		 region.forEach(function(element){
			listRegion = BdPdv.find({ region: element}).fetch();
		});
		
		return listRegion;
*/
		console.log(regionClicked);
	pdvRegion = BdPdv.find({region : regionClicked}).fetch();
		return pdvRegion;
	
	} 
});