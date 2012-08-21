//
// http://www.openjs.com/scripts/createdom/
//
function $C(dom,id)
{
	if(!id) var id = "";
	var valid_tags = ",p,div,span,strong,em,u,img,pre,code,br,hr,a,script,link,table,tr,td,h1,h2,h3,h4,h5,h6,sup,sub,ul,ol,li,dd,dl,dt,form,input,textarea,legend,label,fieldset,select,option,blockquote,";
	var html = new Array();
	var non_alapha = new RegExp(/_\d*$/);
	for(var tag in dom) {
		var child = false;
		if(isNaN(tag)) { //Associative array
			var attributes = dom[tag];
		} else { //It's a list
			var tagname = "";
			var attributes = "";
			for(var tagname in dom[tag]) {
				attributes = dom[tag][tagname];
			}
			tag = tagname;
		}
		
		tag = tag.replace(non_alapha,"");
		var ele = document.createElement(tag);
		if(typeof(attributes) == "string") child = document.createTextNode(attributes);
		else if(attributes) {
			for(var att in attributes) {
				var value = "";
				if(isNaN(att)) {
					value = attributes[att];
				} else {
					for(var index in attributes[att]) {
						value = attributes[att][index];
					}
 					att = index;
				}

				att = att.replace(non_alapha,"");
				if(valid_tags.indexOf(","+att+",") != -1) {
					var node = new Object;
					node[att] = value;
					ele.appendChild($C(node,""));//recursive
				}
				else if(att == "text") child = document.createTextNode(value);
				else ele.setAttribute(att,value);
			}
		}

		if(child && attributes) ele.appendChild(child);
		html.push(ele);
	}

	if(!id) {
		if(html.length == 1) return html[0];
		return html;
	}
	var node = id;
	if(typeof id == "string") node = document.getElementById(id);
	for(var i=0;el=html[i],i<html.length;i++) node.appendChild(el);
}

function insertAfter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var divs = document.getElementsByClassName('photo-div');
var pdiv = divs[0];
var imgs = pdiv.getElementsByTagName('img');
var image_uri = imgs[1].src;
var short_uri = document.getElementById('shorturl') ? document.getElementById('shorturl').href : null;
	
header = $C({
	div:{
		id:'flickrlinks',
		h4:{
			id:'flickrlinks_header',
			text:'Links'
		}
	}
});

ul_image = $C({
	ul:[{
			li:{
				id:'flickrlinks_image_head',
				text:'Image URL'
			}
		},
		{
			li:{
				id:'flickrlinks_image_uri',
				a:{
					rel:'no-follow',
					href:image_uri,
					text:image_uri
				}
			}
		},
	]
});

ul_short = $C({
	ul:[{
			li:{
				id:'flickrlinks_short_head',
				text:'Short URL'
			}
		},
		{
			li:{
				id:'flickrlinks_short_uri',
				a:{
					rel:'no-follow',
					href:short_uri,
					text:short_uri
				}
			}
		},
	]
});

var sidecar = document.getElementById('sidecar');
sidecar.insertBefore(header, sidecar.firstChild);

var h4 = document.getElementById('flickrlinks_header');
if (short_uri != null) insertAfter(h4, ul_short);
insertAfter(h4, ul_image);

function selectLink(id) {
	var el = document.getElementById(id);
	var s = window.getSelection();
	var r = document.createRange();
	r.selectNodeContents(el);
	s.removeAllRanges();
	s.addRange(r);
}

document.getElementById('flickrlinks_image_head').addEventListener('click', function (e) {
	selectLink('flickrlinks_image_uri');
}, true);

document.getElementById('flickrlinks_short_head').addEventListener('click', function (e) {
	selectLink('flickrlinks_short_uri');
}, true);
