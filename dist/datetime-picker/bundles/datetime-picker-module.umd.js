(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@co.mmons/angular-extensions/browser/match-media'), require('@co.mmons/angular-intl'), require('@co.mmons/ionic-extensions/buttons'), require('@co.mmons/ionic-extensions/select'), require('@ionic/angular'), require('@co.mmons/js-utils/core')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/datetime-picker', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@co.mmons/angular-extensions/browser/match-media', '@co.mmons/angular-intl', '@co.mmons/ionic-extensions/buttons', '@co.mmons/ionic-extensions/select', '@ionic/angular', '@co.mmons/js-utils/core'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = global.co.mmons['ionic-extensions'] || {}, global.co.mmons['ionic-extensions']['datetime-picker'] = {}), global.ng.common, global.ng.core, global.ng.forms, global.matchMedia, global.angularIntl, global.buttons, global.select, global.angular, global.core$1));
}(this, (function (exports, common, core, forms, matchMedia, angularIntl, buttons, select, angular, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var defaultDateTimeFormat = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "2-digit", minute: "2-digit"
    };
    var defaultDateFormat = {
        year: "numeric", month: "numeric", day: "numeric"
    };

    var currentLocale;
    function timezoneInfo(tz, date) {
        if (!date) {
            date = new Date();
        }
        var format1 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: tz };
        var format2 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short", timeZone: tz };
        if (!currentLocale) {
            currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
        }
        try {
            var d = new Intl.DateTimeFormat(currentLocale, format1).format(date);
            var o = new Intl.DateTimeFormat(currentLocale, format2).format(date).replace(d, "").trim();
            return { id: tz, label: tz.replace("_", " ") + " (" + o + ")", date: d };
        }
        catch (error) {
            throw new Error("Invalid timezone. " + error);
            // console.log(error);
        }
    }

    var rawTimezones = [
        "Europe/Andorra",
        "Asia/Dubai",
        "Asia/Kabul",
        "Europe/Tirane",
        "Asia/Yerevan",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville",
        "Antarctica/Mawson",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok",
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Cordoba",
        "America/Argentina/Salta",
        "America/Argentina/Jujuy",
        "America/Argentina/Tucuman",
        "America/Argentina/Catamarca",
        "America/Argentina/La_Rioja",
        "America/Argentina/San_Juan",
        "America/Argentina/Mendoza",
        "America/Argentina/San_Luis",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Ushuaia",
        "Pacific/Pago_Pago",
        "Europe/Vienna",
        "Australia/Lord_Howe",
        "Antarctica/Macquarie",
        "Australia/Hobart",
        "Australia/Currie",
        "Australia/Melbourne",
        "Australia/Sydney",
        "Australia/Broken_Hill",
        "Australia/Brisbane",
        "Australia/Lindeman",
        "Australia/Adelaide",
        "Australia/Darwin",
        "Australia/Perth",
        "Australia/Eucla",
        "Asia/Baku",
        "America/Barbados",
        "Asia/Dhaka",
        "Europe/Brussels",
        "Europe/Sofia",
        "Atlantic/Bermuda",
        "Asia/Brunei",
        "America/La_Paz",
        "America/Noronha",
        "America/Belem",
        "America/Fortaleza",
        "America/Recife",
        "America/Araguaina",
        "America/Maceio",
        "America/Bahia",
        "America/Sao_Paulo",
        "America/Campo_Grande",
        "America/Cuiaba",
        "America/Santarem",
        "America/Porto_Velho",
        "America/Boa_Vista",
        "America/Manaus",
        "America/Eirunepe",
        "America/Rio_Branco",
        "America/Nassau",
        "Asia/Thimphu",
        "Europe/Minsk",
        "America/Belize",
        "America/St_Johns",
        "America/Halifax",
        "America/Glace_Bay",
        "America/Moncton",
        "America/Goose_Bay",
        "America/Blanc-Sablon",
        "America/Toronto",
        "America/Nipigon",
        "America/Thunder_Bay",
        "America/Iqaluit",
        "America/Pangnirtung",
        "America/Atikokan",
        "America/Winnipeg",
        "America/Rainy_River",
        "America/Resolute",
        "America/Rankin_Inlet",
        "America/Regina",
        "America/Swift_Current",
        "America/Edmonton",
        "America/Cambridge_Bay",
        "America/Yellowknife",
        "America/Inuvik",
        "America/Creston",
        "America/Dawson_Creek",
        "America/Fort_Nelson",
        "America/Vancouver",
        "America/Whitehorse",
        "America/Dawson",
        "Indian/Cocos",
        "Europe/Zurich",
        "Africa/Abidjan",
        "Pacific/Rarotonga",
        "America/Santiago",
        "America/Punta_Arenas",
        "Pacific/Easter",
        "Asia/Shanghai",
        "Asia/Urumqi",
        "America/Bogota",
        "America/Costa_Rica",
        "America/Havana",
        "Atlantic/Cape_Verde",
        "America/Curacao",
        "Indian/Christmas",
        "Asia/Nicosia",
        "Asia/Famagusta",
        "Europe/Prague",
        "Europe/Berlin",
        "Europe/Copenhagen",
        "America/Santo_Domingo",
        "Africa/Algiers",
        "America/Guayaquil",
        "Pacific/Galapagos",
        "Europe/Tallinn",
        "Africa/Cairo",
        "Africa/El_Aaiun",
        "Europe/Madrid",
        "Africa/Ceuta",
        "Atlantic/Canary",
        "Europe/Helsinki",
        "Pacific/Fiji",
        "Atlantic/Stanley",
        "Pacific/Chuuk",
        "Pacific/Pohnpei",
        "Pacific/Kosrae",
        "Atlantic/Faroe",
        "Europe/Paris",
        "Europe/London",
        "Asia/Tbilisi",
        "America/Cayenne",
        "Africa/Accra",
        "Europe/Gibraltar",
        "America/Godthab",
        "America/Danmarkshavn",
        "America/Scoresbysund",
        "America/Thule",
        "Europe/Athens",
        "Atlantic/South_Georgia",
        "America/Guatemala",
        "Pacific/Guam",
        "Africa/Bissau",
        "America/Guyana",
        "Asia/Hong_Kong",
        "America/Tegucigalpa",
        "America/Port-au-Prince",
        "Europe/Budapest",
        "Asia/Jakarta",
        "Asia/Pontianak",
        "Asia/Makassar",
        "Asia/Jayapura",
        "Europe/Dublin",
        "Asia/Jerusalem",
        "Asia/Kolkata",
        "Indian/Chagos",
        "Asia/Baghdad",
        "Asia/Tehran",
        "Atlantic/Reykjavik",
        "Europe/Rome",
        "America/Jamaica",
        "Asia/Amman",
        "Asia/Tokyo",
        "Africa/Nairobi",
        "Asia/Bishkek",
        "Pacific/Tarawa",
        "Pacific/Enderbury",
        "Pacific/Kiritimati",
        "Asia/Pyongyang",
        "Asia/Seoul",
        "Asia/Almaty",
        "Asia/Qyzylorda",
        "Asia/Qostanay",
        "Asia/Aqtobe",
        "Asia/Aqtau",
        "Asia/Atyrau",
        "Asia/Oral",
        "Asia/Beirut",
        "Asia/Colombo",
        "Africa/Monrovia",
        "Europe/Vilnius",
        "Europe/Luxembourg",
        "Europe/Riga",
        "Africa/Tripoli",
        "Africa/Casablanca",
        "Europe/Monaco",
        "Europe/Chisinau",
        "Pacific/Majuro",
        "Pacific/Kwajalein",
        "Asia/Yangon",
        "Asia/Ulaanbaatar",
        "Asia/Hovd",
        "Asia/Choibalsan",
        "Asia/Macau",
        "America/Martinique",
        "Europe/Malta",
        "Indian/Mauritius",
        "Indian/Maldives",
        "America/Mexico_City",
        "America/Cancun",
        "America/Merida",
        "America/Monterrey",
        "America/Matamoros",
        "America/Mazatlan",
        "America/Chihuahua",
        "America/Ojinaga",
        "America/Hermosillo",
        "America/Tijuana",
        "America/Bahia_Banderas",
        "Asia/Kuala_Lumpur",
        "Asia/Kuching",
        "Africa/Maputo",
        "Africa/Windhoek",
        "Pacific/Noumea",
        "Pacific/Norfolk",
        "Africa/Lagos",
        "America/Managua",
        "Europe/Amsterdam",
        "Europe/Oslo",
        "Asia/Kathmandu",
        "Pacific/Nauru",
        "Pacific/Niue",
        "Pacific/Auckland",
        "Pacific/Chatham",
        "America/Panama",
        "America/Lima",
        "Pacific/Tahiti",
        "Pacific/Marquesas",
        "Pacific/Gambier",
        "Pacific/Port_Moresby",
        "Pacific/Bougainville",
        "Asia/Manila",
        "Asia/Karachi",
        "Europe/Warsaw",
        "America/Miquelon",
        "Pacific/Pitcairn",
        "America/Puerto_Rico",
        "Asia/Gaza",
        "Asia/Hebron",
        "Europe/Lisbon",
        "Atlantic/Madeira",
        "Atlantic/Azores",
        "Pacific/Palau",
        "America/Asuncion",
        "Asia/Qatar",
        "Indian/Reunion",
        "Europe/Bucharest",
        "Europe/Belgrade",
        "Europe/Kaliningrad",
        "Europe/Moscow",
        "Europe/Simferopol",
        "Europe/Kirov",
        "Europe/Astrakhan",
        "Europe/Volgograd",
        "Europe/Saratov",
        "Europe/Ulyanovsk",
        "Europe/Samara",
        "Asia/Yekaterinburg",
        "Asia/Omsk",
        "Asia/Novosibirsk",
        "Asia/Barnaul",
        "Asia/Tomsk",
        "Asia/Novokuznetsk",
        "Asia/Krasnoyarsk",
        "Asia/Irkutsk",
        "Asia/Chita",
        "Asia/Yakutsk",
        "Asia/Khandyga",
        "Asia/Vladivostok",
        "Asia/Ust-Nera",
        "Asia/Magadan",
        "Asia/Sakhalin",
        "Asia/Srednekolymsk",
        "Asia/Kamchatka",
        "Asia/Anadyr",
        "Asia/Riyadh",
        "Pacific/Guadalcanal",
        "Indian/Mahe",
        "Africa/Khartoum",
        "Europe/Stockholm",
        "Asia/Singapore",
        "America/Paramaribo",
        "Africa/Juba",
        "Africa/Sao_Tome",
        "America/El_Salvador",
        "Asia/Damascus",
        "America/Grand_Turk",
        "Africa/Ndjamena",
        "Indian/Kerguelen",
        "Asia/Bangkok",
        "Asia/Dushanbe",
        "Pacific/Fakaofo",
        "Asia/Dili",
        "Asia/Ashgabat",
        "Africa/Tunis",
        "Pacific/Tongatapu",
        "Europe/Istanbul",
        "America/Port_of_Spain",
        "Pacific/Funafuti",
        "Asia/Taipei",
        "Europe/Kiev",
        "Europe/Uzhgorod",
        "Europe/Zaporozhye",
        "Pacific/Wake",
        "America/New_York",
        "America/Detroit",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Indiana/Indianapolis",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Vevay",
        "America/Chicago",
        "America/Indiana/Tell_City",
        "America/Indiana/Knox",
        "America/Menominee",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/North_Dakota/Beulah",
        "America/Denver",
        "America/Boise",
        "America/Phoenix",
        "America/Los_Angeles",
        "America/Anchorage",
        "America/Juneau",
        "America/Sitka",
        "America/Metlakatla",
        "America/Yakutat",
        "America/Nome",
        "America/Adak",
        "Pacific/Honolulu",
        "America/Montevideo",
        "Asia/Samarkand",
        "Asia/Tashkent",
        "America/Caracas",
        "Asia/Ho_Chi_Minh",
        "Pacific/Efate",
        "Pacific/Wallis",
        "Pacific/Apia",
        "Africa/Johannesburg"
    ];
    function timezones(date) {
        var e_1, _a;
        if (!date) {
            date = new Date();
        }
        var unsorted = [];
        try {
            for (var rawTimezones_1 = __values(rawTimezones), rawTimezones_1_1 = rawTimezones_1.next(); !rawTimezones_1_1.done; rawTimezones_1_1 = rawTimezones_1.next()) {
                var tz = rawTimezones_1_1.value;
                try {
                    unsorted.push(timezoneInfo(tz, date));
                }
                catch (error) {
                    // console.warn(error);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rawTimezones_1_1 && !rawTimezones_1_1.done && (_a = rawTimezones_1.return)) _a.call(rawTimezones_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return unsorted.sort(function (a, b) { return a.date.localeCompare(b.date); });
    }

    var weekdayNarrowFormat = {
        weekday: "short"
    };
    var monthYearFormat = {
        month: "long",
        year: "numeric"
    };
    var monthFormat = {
        month: "long"
    };
    var DateTimePickerOverlay = /** @class */ (function () {
        function DateTimePickerOverlay(viewController, intl, changeDetector) {
            this.viewController = viewController;
            this.intl = intl;
            this.changeDetector = changeDetector;
            this.dateView = "days";
            this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Year") }];
        }
        DateTimePickerOverlay.prototype.dateViewChanged = function () {
            this.dateViewValue = new Date(this.value);
            this.generateDateValues();
            this.generateDateHeader();
        };
        DateTimePickerOverlay.prototype.dateViewMove = function (step) {
            if (this.dateView == "days") {
                this.dateViewValue.setUTCMonth(this.dateViewValue.getUTCMonth() + step);
            }
            else if (this.dateView == "months") {
                this.dateViewValue.setUTCFullYear(this.dateViewValue.getUTCFullYear() + step);
            }
            else if (this.dateView == "years") {
                var yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
                var yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
                var yearStart = 0;
                if (yearTens >= 80) {
                    yearStart = 80;
                }
                else if (yearTens >= 60) {
                    yearStart = 60;
                }
                else if (yearTens >= 40) {
                    yearStart = 40;
                }
                else if (yearTens >= 20) {
                    yearStart = 20;
                }
                this.dateViewValue.setUTCFullYear(yearHundret + yearStart + (20 * step));
            }
            this.generateDateValues();
            this.generateDateHeader();
        };
        DateTimePickerOverlay.prototype.dateValueClicked = function (value) {
            var e_1, _a;
            var tmpDate = new Date(this.dateViewValue);
            if (this.dateView == "days") {
                tmpDate.setUTCDate(value);
            }
            else if (this.dateView == "months") {
                tmpDate.setUTCMonth(value);
                for (var i = 1; i < 5; i++) {
                    if (tmpDate.getUTCMonth() != value) {
                        tmpDate = new Date(this.dateViewValue);
                        tmpDate.setUTCDate(tmpDate.getUTCDate() - i);
                        tmpDate.setUTCMonth(value);
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.dateView == "years") {
                tmpDate.setUTCFullYear(value);
                for (var i = 1; i < 5; i++) {
                    if (tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()) {
                        tmpDate = new Date(this.dateViewValue);
                        tmpDate.setUTCMonth(this.dateViewValue.getUTCMonth(), tmpDate.getUTCDate() - i);
                        tmpDate.setUTCFullYear(value);
                    }
                    else {
                        break;
                    }
                }
            }
            try {
                for (var _b = __values(this.dateValues), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    v.checked = v.id == value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.value = new Date(tmpDate);
            this.dateViewValue = new Date(tmpDate);
        };
        DateTimePickerOverlay.prototype.generateDateValues = function () {
            this.dateValues = [];
            var tmpDate = new Date(this.dateViewValue);
            if (this.dateView == "days") {
                for (var d = 1; d <= 33; d++) {
                    tmpDate.setUTCDate(d);
                    tmpDate.setUTCHours(0, 0, 0, 0);
                    this.dateValues.push({
                        id: d,
                        label: d,
                        sublabel: this.intl.dateFormat(tmpDate, weekdayNarrowFormat),
                        checked: (this.value.getUTCFullYear() == tmpDate.getUTCFullYear() && this.value.getUTCMonth() == tmpDate.getUTCMonth() && this.value.getUTCDate() == d),
                        hidden: tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()
                    });
                }
            }
            else if (this.dateView == "months") {
                var tmpDate_1 = new Date(Date.UTC(1999, this.dateViewValue.getUTCMonth()));
                for (var m = 0; m < 12; m++) {
                    tmpDate_1.setUTCMonth(m);
                    this.dateValues.push({
                        id: m,
                        label: this.intl.dateFormat(tmpDate_1, monthFormat),
                        checked: this.value.getUTCFullYear() == this.dateViewValue.getUTCFullYear() && this.value.getUTCMonth() == m
                    });
                }
            }
            else if (this.dateView == "years") {
                var tmpDate_2 = new Date(this.dateViewValue);
                var yearHundret = Math.floor(tmpDate_2.getUTCFullYear() / 100) * 100;
                var yearTens = tmpDate_2.getUTCFullYear() - yearHundret;
                var yearStart = 0;
                if (yearTens >= 80) {
                    yearStart = 80;
                }
                else if (yearTens >= 60) {
                    yearStart = 60;
                }
                else if (yearTens >= 40) {
                    yearStart = 40;
                }
                else if (yearTens >= 20) {
                    yearStart = 20;
                }
                tmpDate_2.setUTCFullYear(yearHundret + yearStart - 1);
                for (var y = 0; y < 20; y++) {
                    tmpDate_2.setUTCFullYear(tmpDate_2.getUTCFullYear() + 1);
                    this.dateValues.push({
                        id: tmpDate_2.getUTCFullYear(),
                        label: tmpDate_2.getUTCFullYear(),
                        checked: this.value.getUTCFullYear() == tmpDate_2.getUTCFullYear()
                    });
                }
            }
        };
        DateTimePickerOverlay.prototype.generateDateHeader = function () {
            if (this.dateView == "days") {
                this.dateHeader = this.intl.dateFormat(this.dateViewValue, monthYearFormat);
            }
            else if (this.dateView == "months") {
                this.dateHeader = this.dateViewValue.getUTCFullYear() + "";
            }
            else if (this.dateView == "years") {
                var yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
                var yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
                var yearStart = 0;
                if (yearTens >= 80) {
                    yearStart = 80;
                }
                else if (yearTens >= 60) {
                    yearStart = 60;
                }
                else if (yearTens >= 40) {
                    yearStart = 40;
                }
                else if (yearTens >= 20) {
                    yearStart = 20;
                }
                this.dateHeader = yearHundret + yearStart + " - " + (yearHundret + yearStart + 19);
            }
        };
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeVisible", {
            get: function () {
                return !!this.formatOptions.hour || !!this.formatOptions.hour12 || !!this.formatOptions.minute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeHoursFormatted", {
            get: function () {
                return this.formatTime(this.value.getUTCHours());
            },
            set: function (hours) {
                try {
                    var h = parseInt(hours);
                    if (!isNaN(h)) {
                        this.timeHours = h;
                    }
                    else {
                        this.timeHours = 0;
                    }
                }
                catch (_a) {
                    this.timeHours = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeHours", {
            get: function () {
                return this.value.getUTCHours();
            },
            set: function (hours) {
                if (hours < 0 || hours > 23) {
                    hours = 0;
                }
                this.value.setUTCHours(hours);
                this.dateViewValue.setUTCHours(hours);
                this.changeDetector.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeMinutesFormatted", {
            get: function () {
                return this.formatTime(this.value.getUTCMinutes());
            },
            set: function (minutes) {
                try {
                    var h = parseInt(minutes);
                    if (!isNaN(h)) {
                        this.timeMinutes = h;
                    }
                    else {
                        this.timeMinutes = 0;
                    }
                }
                catch (_a) {
                    this.timeMinutes = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeMinutes", {
            get: function () {
                return this.value.getUTCMinutes();
            },
            set: function (minutes) {
                if (minutes < 0 || minutes > 59) {
                    minutes = 0;
                }
                this.value.setUTCMinutes(minutes);
                this.dateViewValue.setUTCMinutes(minutes);
                this.changeDetector.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        DateTimePickerOverlay.prototype.formatTime = function (value) {
            if (value < 10) {
                return "0" + value;
            }
            else {
                return value + "";
            }
        };
        DateTimePickerOverlay.prototype.todayClicked = function () {
            var now = new Date();
            this.value.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            this.dateViewValue = new Date(this.value);
            this.generateDateValues();
            this.generateDateHeader();
        };
        DateTimePickerOverlay.prototype.cancelClicked = function () {
            this.viewController.dismiss();
        };
        DateTimePickerOverlay.prototype.doneClicked = function () {
            var value = this.value;
            if (this.timezone && this.timezone !== "UTC") {
                value = new Date(value.getTime() - (core$1.DateTimezone.timezoneOffset(this.timezone, this.value) * 60 * 1000 * -1));
            }
            this.viewController.dismiss(new core$1.DateTimezone(value, this.timezone), null);
        };
        DateTimePickerOverlay.prototype.loadTimezones = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, t;
                var e_2, _c;
                return __generator(this, function (_d) {
                    this.timezones = new select.SelectOptions();
                    try {
                        for (_a = __values(timezones(this.value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            t = _b.value;
                            this.timezones.pushOption(t.id, t.label);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/];
                });
            });
        };
        DateTimePickerOverlay.prototype.ngOnInit = function () {
            this.dateViewValue = new Date(this.value);
            this.generateDateValues();
            this.generateDateHeader();
            if (!this.timezoneDisabled) {
                if (this.timezone) {
                    try {
                        var info = timezoneInfo(this.timezone);
                        this.timezones = new select.SelectOptions();
                        this.timezones.pushOption(info.id, info.label);
                    }
                    catch (error) {
                        // console.warn(error);
                    }
                }
                this.loadTimezones();
            }
        };
        DateTimePickerOverlay.ctorParameters = function () { return [
            { type: angular.ModalController },
            { type: angularIntl.IntlService },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], DateTimePickerOverlay.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerOverlay.prototype, "formatOptions", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerOverlay.prototype, "title", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerOverlay.prototype, "timezone", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
        DateTimePickerOverlay = __decorate([
            core.Component({
                selector: "ionx-datetime-overlay",
                template: "<ion-header>\n    <ion-toolbar>\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button fill=\"outline\" (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions/datetime#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions/datetime#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions/datetime#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: [":host{display:-webkit-box;display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:-webkit-box;display:flex;padding:4px;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
            })
        ], DateTimePickerOverlay);
        return DateTimePickerOverlay;
    }());

    var DateTimePickerInput = /** @class */ (function () {
        function DateTimePickerInput(element, intl, modalController, control) {
            this.element = element;
            this.intl = intl;
            this.modalController = modalController;
            this.control = control;
            this.ionChange = new core.EventEmitter();
            if (control) {
                control.valueAccessor = this;
            }
        }
        DateTimePickerInput_1 = DateTimePickerInput;
        DateTimePickerInput.currentTimezone = function () {
            return new Intl.DateTimeFormat().resolvedOptions().timeZone;
        };
        Object.defineProperty(DateTimePickerInput.prototype, "text", {
            get: function () {
                return this._text;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerInput.prototype, "disabled", {
            /**
             * Whether or not the datetime-picker component is disabled.
             */
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = disabled || disabled == "true" ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerInput.prototype, "listItem", {
            get: function () {
                if (this._listItem) {
                    return this._listItem;
                }
                return this._listItem = this.element.nativeElement.closest("ion-item");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerInput.prototype, "displayFormat", {
            get: function () {
                return this._displayFormat;
            },
            /**
             * The display format of the date and time as text that shows
             * within the item. When the `pickerFormat` input is not used, then the
             * `displayFormat` is used for both display the formatted text, and determining
             * the datetime-picker picker's columns.
             */
            set: function (format) {
                if (typeof format === "string") {
                    this._displayFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
                }
                else {
                    this._displayFormat = format;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerInput.prototype, "pickerFormat", {
            get: function () {
                return this._pickerFormat;
            },
            set: function (format) {
                if (typeof format == "string") {
                    this._pickerFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
                }
                else {
                    this._pickerFormat = format;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerInput.prototype, "value", {
            get: function () {
                if (!this._value) {
                    return undefined;
                }
                return new core$1.DateTimezone(new Date(this._value.date.getTime()), this._value.timezone);
            },
            set: function (value) {
                var changed = false;
                if ((value === undefined || value === null) != (this._value === undefined)) {
                    changed = true;
                }
                else if (typeof value === "number" && (this._value === undefined || value !== this._value.date.getTime())) {
                    changed = true;
                }
                else if (value instanceof Date && (this._value === undefined || value.getTime() !== this._value.date.getTime())) {
                    changed = true;
                }
                else if (value instanceof core$1.DateTimezone && (this._value === undefined || value.date.getTime() !== this._value.date.getTime() || value.timezone !== this._value.timezone)) {
                    changed = true;
                }
                if (typeof value === "number") {
                    this._value = new core$1.DateTimezone(value);
                }
                else if (value instanceof Date) {
                    this._value = new core$1.DateTimezone(value.getTime());
                }
                else if (value instanceof core$1.DateTimezone) {
                    this._value = new core$1.DateTimezone(new Date(value.date.getTime()), value.timezone === "current" ? DateTimePickerInput_1.currentTimezone() : value.timezone);
                }
                else {
                    this._value = undefined;
                }
                if (changed) {
                    this.ionChange.emit(this.value);
                    this.updateText();
                    this.checkListItemHasValue();
                    if (this.controlOnChange && !this.muteControlOnChange) {
                        this.controlOnChange(this.value);
                    }
                }
                this.muteControlOnChange = false;
            },
            enumerable: true,
            configurable: true
        });
        DateTimePickerInput.prototype.clearValue = function () {
            this.value = undefined;
            if (this.controlOnTouched) {
                this.controlOnTouched();
            }
        };
        DateTimePickerInput.prototype.hasValue = function () {
            return !!this._value;
        };
        DateTimePickerInput.prototype.checkListItemHasValue = function () {
            if (this.listItem) {
                if (this.hasValue()) {
                    this.listItem.classList.add("has-value");
                }
                else {
                    this.listItem.classList.remove("has-value");
                }
            }
        };
        DateTimePickerInput.prototype.updateText = function () {
            if (this.hasValue()) {
                var options = Object.assign({}, this.displayFormat || defaultDateTimeFormat);
                if (this._value.timezone) {
                    options.timeZone = this._value.timezone;
                    if (!options.timeZoneName) {
                        options.timeZoneName = "short";
                    }
                }
                if (!this._value.timezone) {
                    options.timeZone = "UTC";
                    options.timeZoneName = undefined;
                }
                this._text = this.intl.dateTimeFormat(this._value, options);
            }
            else {
                this._text = null;
            }
        };
        /*protected*/ DateTimePickerInput.prototype.clicked = function (ev) {
            if (ev.detail === 0 || this.disabled || this.readonly) {
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();
            this.open(ev);
        };
        /*protected*/ DateTimePickerInput.prototype.keyuped = function () {
            this.open(undefined);
        };
        DateTimePickerInput.prototype.open = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var formatOptions, timezone, value, overlayTitle, label, overlay, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.disabled || this.opened || this.readonly) {
                                return [2 /*return*/];
                            }
                            formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
                            timezone = this._value ? this._value.timezone : this.defaultTimezone;
                            if (timezone === "current") {
                                timezone = DateTimePickerInput_1.currentTimezone();
                            }
                            value = this._value && this._value.date ? this._value.date : new Date();
                            {
                                if (!timezone || timezone === "UTC") {
                                    value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), value.getUTCHours(), value.getUTCMinutes(), 0, 0));
                                }
                                else {
                                    value = new Date(value.getTime() + (core$1.DateTimezone.timezoneOffset(timezone, value) * 60 * 1000 * -1));
                                }
                            }
                            overlayTitle = this.overlayTitle;
                            if (this.listItem && !overlayTitle) {
                                label = this.listItem.querySelector("ion-label");
                                if (label) {
                                    overlayTitle = label.innerText;
                                }
                            }
                            return [4 /*yield*/, this.modalController.create({
                                    component: DateTimePickerOverlay,
                                    componentProps: {
                                        formatOptions: formatOptions,
                                        value: value,
                                        timezone: this._value ? this._value.timezone : (this._value === undefined ? (this.defaultTimezone === "current" ? DateTimePickerInput_1.currentTimezone() : this.defaultTimezone) : undefined),
                                        timezoneDisabled: this.timezoneDisabled,
                                        title: overlayTitle
                                    },
                                    backdropDismiss: true,
                                    showBackdrop: true
                                })];
                        case 1:
                            overlay = _b.sent();
                            overlay.present();
                            _a = this.overlayClosed;
                            return [4 /*yield*/, overlay.onDidDismiss()];
                        case 2:
                            _a.apply(this, [(_b.sent()).data]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        DateTimePickerInput.prototype.overlayClosed = function (newValue) {
            if (newValue) {
                this.value = newValue;
            }
            if (this.controlOnTouched) {
                this.controlOnTouched();
            }
            if (this.listItem) {
                this.listItem.classList.add("item-has-focus");
                this.nativeInput.nativeElement.focus();
            }
        };
        DateTimePickerInput.prototype.writeValue = function (value) {
            this.muteControlOnChange = true;
            if (value instanceof Date || value instanceof core$1.DateTimezone || typeof value === "number") {
                this.value = value;
            }
            else {
                this.value = undefined;
            }
        };
        DateTimePickerInput.prototype.registerOnChange = function (fn) {
            this.controlOnChange = fn;
        };
        DateTimePickerInput.prototype.registerOnTouched = function (fn) {
            this.controlOnTouched = fn;
        };
        DateTimePickerInput.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        DateTimePickerInput.prototype.nativeInputFocused = function () {
            if (this.listItem) {
                if (!this._disabled && !this.readonly && !this.listItem.classList.contains("item-has-focus")) {
                    this.listItem.classList.add("item-has-focus");
                    // if (!this.hasValue()) {
                    //     this.open();
                    // }
                }
            }
        };
        DateTimePickerInput.prototype.nativeInputBlured = function () {
            if (this.listItem) {
                this.listItem.classList.remove("item-has-focus");
            }
        };
        DateTimePickerInput.prototype.ngOnChanges = function (changes) {
            if (changes["displayFormat"]) {
                this.updateText();
            }
            if (changes["readonly"] || changes["disabled"]) {
                this.setupCss();
            }
        };
        DateTimePickerInput.prototype.ngOnInit = function () {
            this.updateText();
            this.setupCss();
        };
        DateTimePickerInput.prototype.setupCss = function () {
            if (this.listItem) {
                this.listItem.classList.add("item-input");
                if (this.readonly || this._disabled) {
                    this.listItem.classList.remove("item-interactive");
                }
                else {
                    this.listItem.classList.add("item-interactive");
                }
            }
        };
        DateTimePickerInput.prototype.ngAfterContentChecked = function () {
            //this.setItemInputControlCss();
        };
        var DateTimePickerInput_1;
        DateTimePickerInput.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: angularIntl.IntlService },
            { type: angular.ModalController },
            { type: forms.NgControl }
        ]; };
        __decorate([
            core.ViewChild("nativeInput", { read: core.ElementRef, static: true })
        ], DateTimePickerInput.prototype, "nativeInput", void 0);
        __decorate([
            core.HostBinding("class.datetime-disabled")
        ], DateTimePickerInput.prototype, "_disabled", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "readonly", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "overlayTitle", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "placeholder", void 0);
        __decorate([
            core.Output()
        ], DateTimePickerInput.prototype, "ionChange", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "defaultTimezone", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "disabled", null);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "displayFormat", null);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "pickerFormat", null);
        __decorate([
            core.Input()
        ], DateTimePickerInput.prototype, "value", null);
        __decorate([
            core.HostListener("click", ["$event"])
        ], DateTimePickerInput.prototype, "clicked", null);
        __decorate([
            core.HostListener("keyup.space")
        ], DateTimePickerInput.prototype, "keyuped", null);
        DateTimePickerInput = DateTimePickerInput_1 = __decorate([
            core.Component({
                selector: "ionx-datetime",
                template: "\n        <input #nativeInput\n               type=\"text\" \n               class=\"native-input\" \n               readonly [attr.disabled]=\"disabled || null\"\n               [attr.placeholder]=\"placeholder || null\"\n               [attr.value]=\"text || null\"\n               (focus)=\"nativeInputFocused()\" \n               (blur)=\"nativeInputBlured()\"/>\n    ",
                styles: [":host{position:relative;display:block;-webkit-box-flex:1;flex:1;width:100%;--padding-end:16px;--padding-start:16px;--padding-top:10px;--padding-bottom:10px}:host .native-input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start,0);padding-right:var(--padding-end,0);display:inline-block;-webkit-box-flex:1;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:0;background:0 0;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .native-input::-webkit-input-placeholder{opacity:.5}:host .native-input::-moz-placeholder{opacity:.5}:host .native-input:-ms-input-placeholder{opacity:.5}:host .native-input::-ms-input-placeholder{opacity:.5}:host .native-input::placeholder{opacity:.5}:host .native-input:-webkit-autofill{background-color:transparent}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
            })
        ], DateTimePickerInput);
        return DateTimePickerInput;
    }());

    var DateTimePickerModule = /** @class */ (function () {
        function DateTimePickerModule() {
        }
        DateTimePickerModule = __decorate([
            core.NgModule({
                declarations: [DateTimePickerInput, DateTimePickerOverlay],
                entryComponents: [DateTimePickerOverlay],
                exports: [DateTimePickerInput],
                imports: [common.CommonModule, forms.FormsModule, angular.IonicModule, angularIntl.IntlModule, select.SelectModule, buttons.ButtonsModule, matchMedia.MatchMediaModule]
            })
        ], DateTimePickerModule);
        return DateTimePickerModule;
    }());

    exports.DateTimePickerInput = DateTimePickerInput;
    exports.DateTimePickerModule = DateTimePickerModule;
    exports.ɵa = DateTimePickerOverlay;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=datetime-picker-module.umd.js.map
