//i18n.js

//建置不同語言的翻譯對應表
var i18nTable = {
  'zh-TW': {
    'Current time is' : '現在時間是'
  },
  'zh-CN': {
    'Current time is' : '现在时间是'
  },
  'en-US': {
    'Current time is' : 'Current time is'
  },
};

//Session跟Template都是只在使用者端存在的語法
if (Meteor.isClient) {
  //預設使用語言為繁體中文
  Session.setDefault('useLanguage', 'zh-TW');

  //建置所有模版都能使用的i18n helper
  Template.registerHelper('i18n', function(word) {
    var useLanguage = Session.get('useLanguage');
    var translator = i18nTable[ useLanguage ];
    return translator[ word ];
  });
}

