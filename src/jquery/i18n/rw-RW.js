(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["rw-RW"] = $.extend(true, {}, en, {
        name: "rw-RW",
        englishName: "Kinyarwanda (Rwanda)",
        nativeName: "Kinyarwanda (Rwanda)",
        language: "rw",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["$-n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "RWF"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Ku wa mbere","Ku wa kabiri","Ku wa gatatu","Ku wa kane","Ku wa gatanu","Ku wa gatandatu","Ku cyumweru"],
                    namesAbbr: ["mbe.","kab.","gat.","kan.","gat.","gat.","cyu."],
                    namesShort: ["mb","ka","ga","ka","ga","ga","cy"]
                },
                months: {
                    names: ["Mutarama","Gashyantare","Werurwe","Mata","Gicurasi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza",""],
                    namesAbbr: ["Mut","Gas","Wer","Mat","Gic","Kam","Nya","Kan","Nze","Ukwa","Ugu","Uku",""]
                },
                AM: ["saa moya z.m.","saa moya z.m.","SAA MOYA Z.M."],
                PM: ["saa moya z.n.","saa moya z.n.","SAA MOYA Z.N."],
                eras: [{"name":"AD","start":null,"offset":0}]
            })
        }
    }, regions["rw-RW"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));