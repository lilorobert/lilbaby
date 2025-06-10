;(function () {
'use strict';
var plugin = {
	component: 'my_iptv',
	icon: "<svg height=\"244\" viewBox=\"0 0 260 244\" xmlns=\"http://www.w3.org/2000/svg\" style=\"fill-rule:evenodd;\" fill=\"currentColor\"><path d=\"M259.5 47.5v114c-1.709 14.556-9.375 24.723-23 30.5a2934.377 2934.377 0 0 1-107 1.5c-35.704.15-71.37-.35-107-1.5-13.625-5.777-21.291-15.944-23-30.5v-115c1.943-15.785 10.61-25.951 26-30.5a10815.71 10815.71 0 0 1 208 0c15.857 4.68 24.523 15.18 26 31.5zm-230-13a4963.403 4963.403 0 0 0 199 0c5.628 1.128 9.128 4.462 10.5 10 .667 40 .667 80 0 120-1.285 5.618-4.785 8.785-10.5 9.5-66 .667-132 .667-198 0-5.715-.715-9.215-3.882-10.5-9.5-.667-40-.667-80 0-120 1.35-5.18 4.517-8.514 9.5-10z\"/><path d=\"M70.5 71.5c17.07-.457 34.07.043 51 1.5 5.44 5.442 5.107 10.442-1 15-5.991.5-11.991.666-18 .5.167 14.337 0 28.671-.5 43-3.013 5.035-7.18 6.202-12.5 3.5a11.529 11.529 0 0 1-3.5-4.5 882.407 882.407 0 0 1-.5-42c-5.676.166-11.343 0-17-.5-4.569-2.541-6.069-6.375-4.5-11.5 1.805-2.326 3.972-3.992 6.5-5zM137.5 73.5c4.409-.882 7.909.452 10.5 4a321.009 321.009 0 0 0 16 30 322.123 322.123 0 0 0 16-30c2.602-3.712 6.102-4.879 10.5-3.5 5.148 3.334 6.314 7.834 3.5 13.5a1306.032 1306.032 0 0 0-22 43c-5.381 6.652-10.715 6.652-16 0a1424.647 1424.647 0 0 0-23-45c-1.691-5.369-.191-9.369 4.5-12zM57.5 207.5h144c7.788 2.242 10.288 7.242 7.5 15a11.532 11.532 0 0 1-4.5 3.5c-50 .667-100 .667-150 0-6.163-3.463-7.496-8.297-4-14.5 2.025-2.064 4.358-3.398 7-4z\"/></svg>",
	name: 'ipTV'
};
var isSNG = false;
var lists = [];
var curListId = -1;
var defaultGroup = 'Other';
var catalog = {};
var listCfg = {};
var EPG = {};
var layerInterval;
var epgInterval;
var UID = '';

var chNumber = '';
var chTimeout = null;
var stopRemoveChElement = false;
var chPanel = $((
	"<div class=\"player-info info--visible js-ch-PLUGIN\" style=\"top: 9em;right: auto;z-index: 1000;\">\n" +
	"	<div class=\"player-info__body\">\n" +
	"		<div class=\"player-info__line\">\n" +
	"			<div class=\"player-info__name\">&nbsp;</div>\n" +
	"		</div>\n" +
	"	</div>\n" +
	"</div>").replace(/PLUGIN/g, plugin.component)
).hide().fadeOut(0);
var chHelper = $((
	"<div class=\"player-info info--visible js-ch-PLUGIN\" style=\"top: 14em;right: auto;z-index: 1000;\">\n" +
	"	<div class=\"player-info__body\">\n" +
	"		<div class=\"tv-helper\"></div>\n" +
	"	</div>\n" +
	"</div>").replace(/PLUGIN/g, plugin.component)
).hide().fadeOut(0);
var epgTemplate = $(('<div id="PLUGIN_epg">\n' +
	'<h2 class="js-epgChannel"></h2>\n' +
	'<div class="PLUGIN-details__program-body js-epgNow">\n' +
	'   <div class="PLUGIN-details__program-title">Сейчас</div>\n' +
	'   <div class="PLUGIN-details__program-list">' +
	'<div class="PLUGIN-program selector">\n' +
	'   <div class="PLUGIN-program__time js-epgTime">XX:XX</div>\n' +
	'   <div class="PLUGIN-program__body">\n' +
	'	   <div class="PLUGIN-program__title js-epgTitle"> </div>\n' +
	'	   <div class="PLUGIN-program__progressbar"><div class="PLUGIN-program__progress js-epgProgress" style="width: 50%"></div></div>\n' +
	'   </div>\n' +
	'</div>' +
	'   </div>\n' +
	'   <div class="PLUGIN-program__desc js-epgDesc"></div>'+
	'</div>' +
	'<div class="PLUGIN-details__program-body js-epgAfter">\n' +
	'   <div class="PLUGIN-details__program-title">Потом</div>\n' +
	'   <div class="PLUGIN-details__program-list js-epgList">' +
	'   </div>\n' +
	'</div>' +
	'</div>').replace(/PLUGIN/g, plugin.component)
);
function epgListView(isView) {
	var scroll = $('.' + plugin.component + '.category-full').parents('.scroll');
	if (scroll.length) {
		if (isView) {
			scroll.css({float: "left", width: '70%'});
			scroll.parent().append(epgTemplate);
		} else {
			scroll.css({float: "none", width: '100%'});
			$('#' + plugin.component + '_epg').remove();
		}
	}
}
var epgItemTeplate = $((
	'<div class="PLUGIN-program selector">\n' +
	'   <div class="PLUGIN-program__time js-epgTime">XX:XX</div>\n' +
	'   <div class="PLUGIN-program__body">\n' +
	'	   <div class="PLUGIN-program__title js-epgTitle"> </div>\n' +
	'   </div>\n' +
	'</div>').replace(/PLUGIN/g, plugin.component)
);
var chHelpEl = chHelper.find('.tv-helper');
var chNumEl = chPanel.find('.player-info__name');
var encoder = $('<div/>');

function isPluginPlaylist(playlist) {
	return !(!playlist.length || !playlist[0].tv
		|| !playlist[0].plugin || playlist[0].plugin !== plugin.component);
}
Lampa.PlayerPlaylist.listener.follow('select', function(e) {
	if (e.item.plugin && e.item.plugin === plugin.component && Lampa.Player.runas)
		Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
});
function channelSwitch(dig, isChNum) {
	if (!Lampa.Player.opened()) return false;
	var playlist = Lampa.PlayerPlaylist.get();
	if (!isPluginPlaylist(playlist)) return false;
	if (!$('body>.js-ch-' + plugin.component).length) $('body').append(chPanel).append(chHelper);
	var cnt = playlist.length;
	var prevChNumber = chNumber;
	chNumber += dig;
	var number = parseInt(chNumber);
	if (number && number <= cnt) {
		if (!!chTimeout) clearTimeout(chTimeout);
		stopRemoveChElement = true; // fix removing element in callback on animate.finish()
		chNumEl.text(playlist[number - 1].title);
		if (isChNum || parseInt(chNumber + '0') > cnt) {
			chHelper.finish().hide().fadeOut(0);
		} else {
			var help = [];
			var chHelpMax = 9;
			var start = parseInt(chNumber + '0');
			for (var i = start; i <= cnt && i <= (start + Math.min(chHelpMax, 9)); i++) {
				help.push(encoder.text(playlist[i - 1].title).html());
			}
			chHelpEl.html(help.join('<br>'));
			chHelper.finish().show().fadeIn(0);
		}
		if (number < 10 || isChNum) {
			chPanel.finish().show().fadeIn(0);
		}
		stopRemoveChElement = false;
		var chSwitch = function () {
			var pos = number - 1;
			if (Lampa.PlayerPlaylist.position() !== pos) {
				Lampa.PlayerPlaylist.listener.send('select', {
					playlist: playlist,
					position: pos,
					item: playlist[pos]
				});
				Lampa.Player.runas && Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
			}
			chPanel.delay(1000).fadeOut(500,function(){stopRemoveChElement || chPanel.remove()});
			chHelper.delay(1000).fadeOut(500,function(){stopRemoveChElement || chHelper.remove()});
			chNumber = "";
		}
		if (isChNum === true) {
			chTimeout = setTimeout(chSwitch, 1000);
			chNumber = "";
		} else if (parseInt(chNumber + '0') > cnt) {
			// Ещё одна цифра невозможна - переключаем
			chSwitch();
		} else {
			// Ждём следующую цифру или переключаем
			chTimeout = setTimeout(chSwitch, 3000);
		}
	} else {
		chNumber = prevChNumber;
	}
	return true;
}

var cacheVal = {};

function cache(name, value, timeout) {
	var time = (new Date()) * 1;
	if (!!timeout && timeout > 0) {
		cacheVal[name] = [(time + timeout), value];
		return;
	}
	if (!!cacheVal[name] && cacheVal[name][0] > time) {
		return cacheVal[name][1];
	}
	delete (cacheVal[name]);
	return value;
}

var timeOffset = 0;
var timeOffsetSet = false;

function unixtime() {
	return Math.floor((new Date().getTime() + timeOffset)/1000);
}

function toLocaleTimeString(time) {
	var date = new Date(),
		ofst = parseInt(Lampa.Storage.get('time_offset', 'n0').replace('n',''));
	time = time || date.getTime();

	date = new Date(time + (ofst * 1000 * 60 * 60));
	return ('0' + date.getHours()).substr(-2) + ':' + ('0' + date.getMinutes()).substr(-2);
}

function toLocaleDateString(time) {
	var date = new Date(),
		ofst = parseInt(Lampa.Storage.get('time_offset', 'n0').replace('n',''));
	time = time || date.getTime();

	date = new Date(time + (ofst * 1000 * 60 * 60));
	return date.toLocaleDateString();
}

var utils = {
	uid: function() {return UID},
	timestamp: unixtime,
	token: function() {return generateSigForString(Lampa.Storage.field('account_email').toLowerCase())},
	hash: Lampa.Utils.hash,
	hash36: function(s) {return (this.hash(s) * 1).toString(36)}
};

function generateSigForString(string) {
	var sigTime = unixtime();
	return sigTime.toString(36) + ':' + utils.hash36((string || '') + sigTime + utils.uid());
}

function strReplace(str, key2val) {
	for (var key in key2val) {
		str = str.replace(
			new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
			key2val[key]
		);
	}
	return str;
}

function tf(t, format, u, tz) {
	format = format || '';
	tz = parseInt(tz || '0');
	var thisOffset = 0;
	thisOffset += tz * 60;
	if (!u) thisOffset += parseInt(Lampa.Storage.get('time_offset', 'n0').replace('n','')) * 60 - new Date().getTimezoneOffset();
	var d = new Date((t + thisOffset) * 6e4);
	var r = {yyyy:d.getUTCFullYear(),MM:('0'+(d.getUTCMonth()+1)).substr(-2),dd:('0'+d.getUTCDate()).substr(-2),HH:('0'+d.getUTCHours()).substr(-2),mm:('0'+d.getUTCMinutes()).substr(-2),ss:('0'+d.getUTCSeconds()).substr(-2),UTF:t*6e4};
	return strReplace(format, r);
}

function prepareUrl(url, epg) {
	var m = [], val = '', r = {start:unixtime,offset:0};
	if (epg && epg.length) {
		r = {
			start: epg[0] * 60,
			utc: epg[0] * 60,
			end: (epg[0] + epg[1]) * 60,
			utcend: (epg[0] + epg[1]) * 60,
			offset: unixtime() - epg[0] * 60,
			duration: epg[1] * 60,
			now: unixtime,
			lutc: unixtime,
			d: function(m){return strReplace(m[6]||'',{M:epg[1],S:epg[1]*60,h:Math.floor(epg[1]/60),m:('0'+(epg[1] % 60)).substr(-2),s:'00'})},
			b: function(m){return tf(epg[0], m[6], m[4], m[5])},
			e: function(m){return tf(epg[0] + epg[1], m[6], m[4], m[5])},
			n: function(m){return tf(unixtime() / 60, m[6], m[4], m[5])}
		};
	}
	while (!!(m = url.match(/\${(\((([a-zA-Z\d]+?)(u)?)([+-]\d+)?\))?([^${}]+)}/))) {
		if (!!m[2] && typeof r[m[2]] === "function") val = r[m[2]](m);
		else if (!!m[3] && typeof r[m[3]] === "function") val = r[m[3]](m);
		else if (m[6] in r) val = typeof r[m[6]] === "function" ? r[m[6]]() : r[m[6]];
		else if (!!m[2] && typeof utils[m[2]] === "function") val = utils[m[2]](m[6]);
		else if (m[6] in utils) val = typeof utils[m[6]] === "function" ? utils[m[6]]() : utils[m[6]];
		else val = m[1];
		url = url.replace(m[0], encodeURIComponent(val));
	}
	return url;
}

function catchupUrl(url, type, source) {
	type = (type || '').toLowerCase();
	source = source || '';
	if (!type) {
		if (!!source) {
			if (source.search(/^https?:\/\//i) === 0) type = 'default';
			else if (source.search(/^[?&/][^/]/) === 0) type = 'append';
			else type = 'default';
		}
		else if (url.indexOf('${') < 0) type = 'shift';
		else type = 'default';
		console.log(plugin.name, 'Autodetect catchup-type "' + type + '"');
	}
	var newUrl = '';
	switch (type) {
		case 'append':
			if (source) {
				newUrl = (source.search(/^https?:\/\//i) === 0 ? '' : url) + source;
				break; // так и задумано
			}
		case 'timeshift': // @deprecated
		case 'shift': // + append
			newUrl = (source || url);
			newUrl += (newUrl.indexOf('?') >= 0 ? '&' : '?') + 'utc=${start}&lutc=${timestamp}';
			return newUrl;
		case 'flussonic':
		case 'flussonic-hls':
		case 'flussonic-ts':
		case 'fs':
			// Example stream and catchup URLs
			// stream:  http://ch01.spr24.net/151/mpegts?token=my_token
			// catchup: http://ch01.spr24.net/151/timeshift_abs-{utc}.ts?token=my_token
			// stream:  http://list.tv:8888/325/index.m3u8?token=secret
			// catchup: http://list.tv:8888/325/timeshift_rel-{offset:1}.m3u8?token=secret
			// stream:  http://list.tv:8888/325/mono.m3u8?token=secret
			// catchup: http://list.tv:8888/325/mono-timeshift_rel-{offset:1}.m3u8?token=secret
			// stream:  http://list.tv:8888/325/live?token=my_token
			// catchup: http://list.tv:8888/325/{utc}.ts?token=my_token
			return url
				.replace(/\/(video|mono)\.(m3u8|ts)/, '/$1-\${start}-\${duration}.$2')
				.replace(/\/(index|playlist)\.(m3u8|ts)/, '/archive-\${start}-\${duration}.$2')
				.replace(/\/mpegts/, '/timeshift_abs-\${start}.ts')
				;
		case 'xc':
			// Example stream and catchup URLs
			// stream:  http://list.tv:8080/my@account.xc/my_password/1477
			// catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.ts
			// stream:  http://list.tv:8080/live/my@account.xc/my_password/1477.m3u8
			// catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.m3u8
			newUrl = url
				.replace(
					/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)\.m3u8?$/,
					'$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.m3u8'
				)
				.replace(
					/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)(\.ts|)$/,
					'$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.ts'
				)
			;
			break;
		case 'default':
			newUrl = source || url;
			break;
		case 'disabled':
			return false;
		default:
			console.log(plugin.name, 'Err: no support catchup-type="' + type + '"');
			return false;
	}
	if (newUrl.indexOf('${') < 0) return catchupUrl(newUrl,'shift');
	return newUrl;
}

/* ***********************************
 * Управление плеером клавишами пульта
 * ***********************************
 * Поддержка переключения каналов (возможно не все устройства):
 * - цифровыми клавишами (по номеру канала)
 * - клавишами влево-вправо
 * - клавиши Pg+ и Pg-
 */
function keydown(e) {
	var code = e.code;
	if (Lampa.Activity.active().component === plugin.component
		&& Lampa.Player.opened()
		&& !$('body.selectbox--open').length
	) {
		var playlist = Lampa.PlayerPlaylist.get();
		if (!isPluginPlaylist(playlist)) return;
		var isStopEvent = false;
		var curCh = cache('curCh') || (Lampa.PlayerPlaylist.position() + 1);
		if (code === 428 || code === 34 // Pg-
			//4 - Samsung orsay
			|| ((code === 37 || code === 4) // left
				&& !$('.player.tv .panel--visible .focus').length
				&& !$('.player.tv .player-footer.open .focus').length
			)
		) {
			curCh = curCh === 1 ? playlist.length : curCh - 1; // зацикливаем
			cache('curCh', curCh, 1000);
			isStopEvent = channelSwitch(curCh, true);
		} else if (code === 427 || code === 33 // Pg+
			// 5 - Samsung orsay right
			|| ((code === 39 || code === 5) // right
				&& !$('.player.tv .panel--visible .focus').length
				&& !$('.player.tv .player-footer.open .focus').length
			)
		) {
			curCh = curCh === playlist.length ? 1 : curCh + 1; // зацикливаем
			cache('curCh', curCh, 1000);
			isStopEvent = channelSwitch(curCh, true);
		} else if (code >= 48 && code <= 57) { // numpad
			isStopEvent = channelSwitch(code - 48);
		} else if (code >= 96 && code <= 105) { // numpad
			isStopEvent = channelSwitch(code - 96);
		}
		//29460 - Samsung orsay
		if (code === 38 || code === 29460) { // Controller.move('up')
			// this.selectGroup();
			// isStopEvent = true;
		}
		if (isStopEvent) {
			e.event.preventDefault();
			e.event.stopPropagation();
		}
	}
}

function bulkWrapper(func, bulk) {
	var bulkCnt = 1, timeout = 1, queueEndCallback, queueStepCallback, emptyFn = function(){};
	if (typeof bulk === 'object') {
		timeout = bulk.timeout || timeout;
		queueStepCallback = bulk.onBulk || emptyFn;
		queueEndCallback = bulk.onEnd || emptyFn;
		bulkCnt = bulk.bulk || bulkCnt;
	} else if (typeof bulk === 'number') {
		bulkCnt = bulk;
		if (typeof arguments[2] === "number") timeout = arguments[2];
	} else if (typeof bulk === 'function') {
		queueStepCallback = bulk;
		if (typeof arguments[2] === "number") bulkCnt = arguments[2];
		if (typeof arguments[3] === "number") timeout = arguments[3];
	}
	if (!bulkCnt || bulkCnt < 1) bulkCnt = 1;
	if (typeof queueEndCallback !== 'function') queueEndCallback = emptyFn;
	if (typeof queueStepCallback !== 'function') queueStepCallback = emptyFn;
	var context = this;
	var queue = [];
	var interval;
	var cnt = 0;
	var runner = function() {
		if (!!queue.length && !interval) {
			interval = setInterval(
				function() {
					var i = 0;
					while (queue.length && ++i <= bulkCnt) func.apply(context, queue.shift());
					i = queue.length ? i : i-1;
					cnt += i;
					queueStepCallback.apply(context, [i, cnt, queue.length])
					if (!queue.length) {
						clearInterval(interval);
						interval = null;
						queueEndCallback.apply(context, [i, cnt, queue.length]);
					}
				},
				timeout || 0
			);
		}
	}
	return function() {
		queue.push(arguments);
		runner();
	}
}

function getEpgSessCache(epgId, t) {
	var key = getEpgSessKey(epgId);
	var epg = sessionStorage.getItem(key);
	if (epg) {
		epg = JSON.parse(epg);
		if (t) {
			if (epg.length
				&& (
					t < epg[0][0]
					|| t > (epg[epg.length - 1][0] + epg[epg.length - 1][1])
				)
			) return false;
			while (epg.length && t >= (epg[0][0] + epg[0][1])) epg.shift();
		}
	}
	return epg;
}
function setEpgSessCache(epgId, epg) {
	var key = getEpgSessKey(epgId);
	sessionStorage.setItem(key, JSON.stringify(epg));
}
function getEpgSessKey(epgId) {
	return ['epg', epgId].join('\t');
}
function networkSilentSessCache(url, success, fail, param) {
	var context = this;
	var urlForKey = url.replace(/([&?])sig=[^&]+&?/, '$1');
	var key = ['cache', urlForKey, param ? utils.hash36(JSON.stringify(param)) : ''].join('\t');
	var data = sessionStorage.getItem(key);
	if (data) {
		data = JSON.parse(data);
		if (data[0]) typeof success === 'function' && success.apply(context, [data[1]]);
		else typeof fail === 'function' && fail.apply(context, [data[1]]);
	} else {
		var network = new Lampa.Reguest();
		network.silent(
			url,
			function (data) {
				sessionStorage.setItem(key, JSON.stringify([true, data]));
				typeof success === 'function' && success.apply(context, [data]);
			},
			function (data) {
				sessionStorage.setItem(key, JSON.stringify([false, data]));
				typeof fail === 'function' && fail.apply(context, [data]);
			},
			param
		);
	}
}

//Стиль
Lampa.Template.add(plugin.component + '_style', '<style>#PLUGIN_epg{margin-right:1em}.PLUGIN-program__desc{font-size:0.9em;margin:0.5em;text-align:justify;max-height:15em;overflow:hidden;}.PLUGIN.category-full{padding-bottom:10em}.PLUGIN div.card__view{position:relative;background-color:#353535;background-color:#353535a6;border-radius:1em;cursor:pointer;padding-bottom:60%}.PLUGIN.square_icons div.card__view{padding-bottom:100%}.PLUGIN img.card__img,.PLUGIN div.card__img{background-color:unset;border-radius:unset;max-height:100%;max-width:100%;height:auto;width:auto;position:absolute;top:50%;left:50%;-moz-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:2em}.PLUGIN.contain_icons img.card__img{height:95%;width:95%;object-fit:contain}.PLUGIN .card__title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.PLUGIN .js-layer--hidden{visibility: hidden}.PLUGIN .js-layer--visible{visibility: visible}.PLUGIN .card__age{padding:0;border:1px #3e3e3e solid;margin-top:0.3em;border-radius:0.3em;position:relative;display: none}.PLUGIN .card__age .card__epg-progress{position:absolute;background-color:#3a3a3a;top:0;left:0;width:0%;max-width:100%;height:100%}.PLUGIN .card__age .card__epg-title{position:relative;padding:0.4em 0.2em;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}.PLUGIN.category-full .card__icons {top:0.3em;right:0.3em;justify-content:right;}#PLUGIN{float:right;padding: 1.2em 0;width: 30%;}.PLUGIN-details__group{font-size:1.3em;margin-bottom:.9em;opacity:.5}.PLUGIN-details__title{font-size:4em;font-weight:700}.PLUGIN-details__program{padding-top:4em}.PLUGIN-details__program-title{font-size:1.2em;padding-left:4.9em;margin-top:1em;margin-bottom:1em;opacity:.5}.PLUGIN-details__program-list>div+div{margin-top:1em}.PLUGIN-details__program>div+div{margin-top:2em}.PLUGIN-program{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;font-size:1.2em;font-weight:300}.PLUGIN-program__time{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:5em;position:relative}.PLUGIN-program.focus .PLUGIN-program__time::after{content:\'\';position:absolute;top:.5em;right:.9em;width:.4em;background-color:#fff;height:.4em;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;margin-top:-0.1em;font-size:1.2em}.PLUGIN-program__progressbar{width:10em;height:0.3em;border:0.05em solid #fff;border-radius:0.05em;margin:0.5em 0.5em 0 0}.PLUGIN-program__progress{height:0.25em;border:0.05em solid #fff;background-color:#fff;max-width: 100%}.PLUGIN .card__icon.icon--timeshift{background-image:url(https://epg.rootu.top/img/icon/timeshift.svg);}</style>'.replace(/PLUGIN/g, plugin.component));
$('body').append(Lampa.Template.get(plugin.component + '_style', {}, true));

function pluginPage(object) {
	if (object.id !== curListId) {
		catalog = {};
		listCfg = {};
		curListId = object.id;
	}
	EPG = {};
	var epgIdCurrent = '';
	var epgPath = '';
	var favorite = getStorage('favorite' + object.id, '[]');
	var network = new Lampa.Reguest();
	var scroll = new Lampa.Scroll({
		mask: true,
		over: true,
		step: 250
	});
	// var items = [];
	var html = $('<div></div>');
	var body = $('<div class="' + plugin.component + ' category-full"></div>');
	body.toggleClass('square_icons', getSettings('square_icons'));
	body.toggleClass('contain_icons', getSettings('contain_icons'));
	var info;
	var last;
	if (epgInterval) clearInterval(epgInterval);
	epgInterval = setInterval(function() {
		for (var epgId in EPG) {
			epgRender(epgId);
		}
	}, 10000);

	var layerCards, layerMinPrev = 0, layerMaxPrev = 0, layerFocusI = 0, layerCnt = 24;
	if (layerInterval) clearInterval(layerInterval);
	layerInterval = setInterval(function() {
		if (!layerCards) return;
		var minI = Math.max(layerFocusI - layerCnt, 0);
		var maxI = Math.min(layerFocusI + layerCnt, layerCards.length - 1);
		if (layerMinPrev > maxI || layerMaxPrev < minI) {
			layerCards.slice(layerMinPrev, layerMaxPrev + 1).removeClass('js-layer--visible');
			cardsEpgRender(layerCards.slice(minI, maxI + 1).addClass('js-layer--visible'));
		} else {
			if (layerMinPrev < minI) layerCards.slice(layerMinPrev, minI + 1).removeClass('js-layer--visible');
			if (layerMaxPrev > maxI) layerCards.slice(maxI, layerMaxPrev + 1).removeClass('js-layer--visible');
			if (layerMinPrev > minI) cardsEpgRender(layerCards.slice(minI, layerMinPrev + 1).addClass('js-layer--visible'));
			if (layerMaxPrev < maxI) cardsEpgRender(layerCards.slice(layerMaxPrev, maxI + 1).addClass('js-layer--visible'));
		}
		layerMinPrev = minI;
		layerMaxPrev = maxI;

	}, 50);
	this.create = function () {
		var _this = this;
		this.activity.loader(true);
		var emptyResult = function () {
			var empty = new Lampa.Empty();
			html.append(empty.render());
			_this.start = empty.start;
			_this.activity.loader(false);
			_this.activity.toggle();
		};
		if (Object.keys(catalog).length) {
			_this.build(catalog);
		} else if(!lists[object.id] || !object.url) {
			emptyResult();
			return;
		} else {
			var load = 1, data;
			var compileList = function (dataList) {
				data = dataList;
				if (!--load) parseListHeader();
			};
			if (!timeOffsetSet) {
				load++;
				(function () {
					var ts = new Date().getTime();
					network.silent(Lampa.Utils.protocol() + 'epg.rootu.top/api/time',
						function (serverTime) {
							var te = new Date().getTime();
							timeOffset = (serverTime < ts || serverTime > te) ? serverTime - te : 0;
							timeOffsetSet = true;
							compileList(data);
						},
						function () {
							timeOffsetSet = true;
							compileList(data);
						}
					);
				})();
			}
			var parseListHeader = function () {
				if (typeof data != 'string'
					|| data.substr(0, 7).toUpperCase() !== "#EXTM3U"
				) {
					emptyResult();
					return;
				}
				var m, mm, channelsUri = 'channels';
				var l = data.split(/\r?\n/, 2)[0];
				if (!!(m = l.match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))) {
					// listCfg
					for (var jj = 0; jj < m.length; jj++) {
						if (!!(mm = m[jj].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
							listCfg[mm[1].toLowerCase()] = mm[4] || (mm[3] ? '' : mm[2]);
						}
					}
				}
				listCfg['epgUrl'] = listCfg['url-tvg'] || listCfg['x-tvg-url'] || '';
				listCfg['epgCode'] = utils.hash36(listCfg['epgUrl'].toLowerCase().replace(/https:\/\//g, 'http://'));
				console.log(plugin.name, 'epgCode', listCfg['epgCode']);
				/* epg.it999.ru epgCode [def  epg2.xml.gz epg.xml.gz epg2.xml  epg2xml   ru2.xml.gz ru.xml.gz] */
				listCfg['isEpgIt999'] = ["0", "4v7a2u",   "skza0s",  "oj8j5z", "sab9bx", "rv7awh",  "2blr83"].indexOf(listCfg['epgCode']) >= 0;
				listCfg['isYosso'] = ["godxcd"].indexOf(listCfg['epgCode']) >= 0;
				if (/^https?:\/\/.+/i.test(listCfg['epgUrl']) && listCfg['epgUrl'].length < 8000) {
					channelsUri = listCfg['epgCode'] + '/' + channelsUri + '?url=' + encodeURIComponent(listCfg['epgUrl'])
						+ '&uid=' + utils.uid() + '&sig=' + generateSigForString(listCfg['epgUrl']);
				}
				listCfg['epgApiChUrl'] = Lampa.Utils.protocol() + 'epg.rootu.top/api/' + channelsUri;
				networkSilentSessCache(listCfg['epgApiChUrl'], parseList, parseList);
			}
			var parseList = function () {
				if (typeof data != 'string'
					|| data.substr(0, 7).toUpperCase() !== "#EXTM3U"
				) {
					emptyResult();
					return;
				}
				catalog = {
					'': {
						title: langGet('favorites'),
						setEpgId: false,
						channels: []
					}
				};
				lists[object.id].groups = [{
					title: langGet('favorites'),
					key: ''
				}];
				var l = data.split(/\r?\n/);
				var cnt = 0, i = 1, chNum = 0, m, mm, defGroup = defaultGroup, chInGroupCnt = {}, maxChInGroup = getSettings('max_ch_in_group');
				while (i < l.length) {
					chNum = cnt + 1;
					var channel = {
						ChNum: chNum,
						Title: "Ch " + chNum,
						isYouTube: false,
						Url: '',
						Group: '',
						Options: {}
					};
					for (; cnt < chNum && i < l.length; i++) {
						if (!!(m = l[i].match(/^#EXTGRP:\s*(.+?)\s*$/i))
							&& m[1].trim() !== ''
						) {
							defGroup = m[1].trim();
						} else if (!!(m = l[i].match(/^#EXTINF:\s*-?\d+(\s+\S.*?\s*)?,(.+)$/i))) {
							channel.Title = m[2].trim();
							if (!!m[1]
								&& !!(m = m[1].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))
							) {
								for (var j = 0; j < m.length; j++) {
									if (!!(mm = m[j].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
										channel[mm[1].toLowerCase()] = mm[4] || (mm[3] ? '' : mm[2]);
									}
								}
							}
						} else if (!!(m = l[i].match(/^#EXTVLCOPT:\s*([^\s=]+)=(.+)$/i))) {
							channel.Options[m[1].trim().toLowerCase()] = m[2].trim();
						}
						// else if (!!(m = l[i].match(/^(https?|udp|rt[ms]?p|mms|acestream):\/\/(.+)$/i))) {
						else if (!!(m = l[i].match(/^(https?):\/\/(.+)$/i))) {
							channel.Url = m[0].trim();
							channel.isYouTube = !!(m[2].match(/^(www\.)?youtube\.com/));
							channel.Group = (channel['group-title'] || defGroup) + "";
							cnt++;
						}
					}
					if (!!channel.Url && !channel.isYouTube) {
						chInGroupCnt[channel.Group] = (chInGroupCnt[channel.Group] || 0) + 1;
						var groupPage = maxChInGroup ? Math.floor((chInGroupCnt[channel.Group] - 1) / maxChInGroup) : 0;
						if (groupPage) channel.Group += ' #' + (groupPage + 1);
						if (!catalog[channel.Group]) {
							catalog[channel.Group] = {
								title: channel.Group,
								setEpgId: false,
								channels: []
							};
							lists[object.id].groups.push({
								title: channel.Group,
								key: channel.Group
							});
						}
						channel['Title'] = channel['Title'].replace(/\s+(\s|ⓢ|ⓖ|ⓥ|ⓞ|Ⓢ|Ⓖ|Ⓥ|Ⓞ)/g, ' ').trim();
						catalog[channel.Group].channels.push(channel);
						var favI = favorite.indexOf(favID(channel.Title));
						if (favI !== -1) {
							catalog[''].channels[favI] = channel;
						}
					}
				}
				for (i = 0; i < lists[object.id].groups.length; i++) {
					var group = lists[object.id].groups[i];
					group.title += ' [' + catalog[group.key].channels.length + ']';
				}
				for (i = 0; i < favorite.length; i++) {
					if (!catalog[''].channels[i]) {
						catalog[''].channels[i] = {
							ChNum: -1,
							Title: "#" + favorite[i],
							isYouTube: false,
							Url: Lampa.Utils.protocol() + 'epg.rootu.top/empty/_.m3u8',
							Group: '',
							Options: {},
							'tvg-logo': Lampa.Utils.protocol() + 'epg.rootu.top/empty/_.gif'
						};
					}
				}
				_this.build(catalog);
			}
			var listUrl = prepareUrl(object.url);
			network.native(
				listUrl,
				compileList,
				function () {
					// Возможно ошибка из-за CORS пробуем silent запрос через CORS прокси
					network.silent(
						Lampa.Utils.protocol() + 'epg.rootu.top/cors.php?url=' + encodeURIComponent(listUrl)
						+ '&uid=' + utils.uid() + '&sig=' + generateSigForString(listUrl),
						compileList,
						emptyResult,
						false,
						{dataType: 'text'}
					);
				},
				false,
				{dataType: 'text'}
			)
		}
		return this.render();
	};
	function epgUpdateData(epgId) {
		var lt = Math.floor(unixtime()/60);
		var t = Math.floor(lt/60), ed, ede;
		if (!!EPG[epgId] && t >= EPG[epgId][0] && t <= EPG[epgId][1]) {
			ed = EPG[epgId][2];
			if (!ed || !ed.length || ed.length >= 3) return;
			ede = ed[ed.length - 1];
			lt = (ede[0] + ede[1]);
			var t2 = Math.floor(lt / 60);
			if ((t2 - t) > 6 || t2 <= EPG[epgId][1]) return;
			t = t2;
		}
		if (!!EPG[epgId]) {
			ed = EPG[epgId][2];
			if (typeof ed !== 'object') return;
			if (ed.length) {
				ede = ed[ed.length - 1];
				lt = (ede[0] + ede[1]);
				var t3 = Math.max(t, Math.floor(lt / 60));
				if (t < t3 && ed.length >= 3) return;
				t = t3;
			}
			EPG[epgId][1] = t;
		} else {
			EPG[epgId] = [t, t, false];
		}
		var success = function(epg) {
			if (EPG[epgId][2] === false) EPG[epgId][2] = [];
			for (var i = 0; i < epg.length; i++) {
				if (lt < (epg[i][0] + epg[i][1])) {
					EPG[epgId][2].push.apply(EPG[epgId][2], epg.slice(i));
					break;
				}
			}
			setEpgSessCache(epgId + epgPath, EPG[epgId][2]);
			epgRender(epgId);
		};
		var fail = function () {
			if (EPG[epgId][2] === false) EPG[epgId][2] = [];
			setEpgSessCache(epgId + epgPath, EPG[epgId][2]);
			epgRender(epgId);
		};
		if (EPG[epgId][2] === false) {
			var epg = getEpgSessCache(epgId + epgPath, lt);
			if (!!epg) return success(epg);
		}
		network.silent(
			Lampa.Utils.protocol() + 'epg.rootu.top/api' + epgPath + '/epg/'  + epgId + '/hour/' + t,
			success,
			fail
		);
	}
	function cardsEpgRender(cards) {
		cards.filter('.js-epgNoRender[data-epg-id]').each(function(){epgRender($(this).attr('data-epg-id'))});
	}
	function epgRender(epgId) {
		var epg = (EPG[epgId] || [0, 0, []])[2];
		var card = body.find('.js-layer--visible[data-epg-id="' + epgId + '"]').removeClass('js-epgNoRender');
		if (epg === false || !card.length) return;
		var epgEl = card.find('.card__age');
		if (!epgEl.length) return;
		var t = Math.floor(unixtime() / 60), enableCardEpg = false, i = 0, e, p, cId, cIdEl;
		while (epg.length && t >= (epg[0][0] + epg[0][1])) epg.shift();
		if (epg.length) {
			e = epg[0];
			if (t >= e[0] && t < (e[0] + e[1])) {
				i++;
				enableCardEpg = true;
				p = Math.round((unixtime() - e[0] * 60) * 100 / (e[1] * 60 || 60));
				cId = e[0] + '_' +epgEl.length;
				cIdEl = epgEl.data('cId') || '';
				if (cIdEl !== cId) {
					epgEl.data('cId', cId);
					epgEl.data('progress', p);
					epgEl.find('.js-epgTitle').text(e[2]);
					epgEl.find('.js-epgProgress').css('width', p + '%');
					epgEl.show();
				} else if (epgEl.data('progress') !== p) {
					epgEl.data('progress', p);
					epgEl.find('.js-epgProgress').css('width', p + '%');
				}
			}
		}
		if (epgIdCurrent === epgId) {
			var ec = $('#' + plugin.component + '_epg');
			var epgNow = ec.find('.js-epgNow');
			cId = epgId + '_' + epg.length + (epg.length ? '_' + epg[0][0] : '');
			cIdEl = ec.data('cId') || '';
			if (cIdEl !== cId) {
				ec.data('cId', cId);
				var epgAfter = ec.find('.js-epgAfter');
				if (i) {
					var slt = toLocaleTimeString(e[0] * 60000);
					var elt = toLocaleTimeString((e[0] + e[1]) * 60000);
					epgNow.data('progress', p);
					epgNow.find('.js-epgProgress').css('width', p + '%');
					epgNow.find('.js-epgTime').text(slt);
					epgNow.find('.js-epgTitle').text(e[2]);
					var desc = e[3] ? ('<p>' + encoder.text(e[3]).html() + '</p>') : '';
					epgNow.find('.js-epgDesc').html(desc.replace(/\n/g,'</p><p>'));
					epgNow.show();
					info.find('.info__create').html(slt + '-' + elt + ' &bull; ' + encoder.text(e[2]).html());
				} else {
					info.find('.info__create').html('');
					epgNow.hide();
				}
				if (epg.length > i) {
					var list = epgAfter.find('.js-epgList');
					list.empty();
					var iEnd = Math.min(epg.length, 8);
					for (; i < iEnd; i++) {
						e = epg[i];
						var item = epgItemTeplate.clone();
						item.find('.js-epgTime').text(toLocaleTimeString(e[0] * 60000));
						item.find('.js-epgTitle')