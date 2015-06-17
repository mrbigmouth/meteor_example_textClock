//index.js

//Template只作用於使用者端，因此相關程式碼也應只在使用者端作用
if (Meteor.isClient) {
  //設定所有時區列表
  var timezoneList = [
    //臺北時區
    {
      timezoneId: 1,
      timezoneText: 'Asia/Taipei',
      timezoneAdjust: 28800000
    },
    //紐約時區
    {
      timezoneId: 2,
      timezoneText: 'America/New_York',
      timezoneAdjust: -14400000
    },
    //UTC標準時間
    {
      timezoneId: 3,
      timezoneText: 'UTC',
      timezoneAdjust: 0
    },
  ];

  //定義各時鐘的預設使用的timezone id
  var dataOfClock1 = new ReactiveVar(1);
  var dataOfClock2 = new ReactiveVar(2);
  var dataOfClock3 = new ReactiveVar(3);

  //定義body中#with使用的helpers
  Template.registerHelper('dataOfClock1', function() {
    //取得clock 1使用的timezone id
    var useTimezoneId = dataOfClock1.get();
    //在timezoneList找尋使用的timezone
    var timezone = _.findWhere(timezoneList, {timezoneId: useTimezoneId});
    return timezone;
  });
  Template.registerHelper('dataOfClock2', function() {
    //取得clock 2使用的timezone id
    var useTimezoneId = dataOfClock2.get();
    //在timezoneList找尋使用的timezone
    var timezone = _.findWhere(timezoneList, {timezoneId: useTimezoneId});
    return timezone;
  });
  Template.registerHelper('dataOfClock3', function() {
    //取得clock 3使用的timezone id
    var useTimezoneId = dataOfClock3.get();
    //在timezoneList找尋使用的timezone
    var timezone = _.findWhere(timezoneList, {timezoneId: useTimezoneId});
    return timezone;
  });

  //將「當前UTC時間」作為響應式資料來源
  var currentUTCTime = new ReactiveVar( new Date( Date.now() + new Date().getTimezoneOffset() * 60 * 1000 ) );
  //定時更新「當前UTC時間」
  Meteor.setInterval(
    function() {
      currentUTCTime.set( new Date( Date.now() + new Date().getTimezoneOffset() * 60 * 1000 ) );
    }, 
    1000
  );

  //註冊template clock的helpers
  Template.clock.helpers({
    //依data context的timezoneAdjust顯示時區時間
    nowString: function() {
      //取得data context裡設定的時區修正值
      var timezoneAdjust = this.timezoneAdjust;
      //將utc時間加上時區修正值
      var currentTimeInTimezone = currentUTCTime.get().getTime() + timezoneAdjust;
      return new Date(currentTimeInTimezone).toLocaleString();
    },
    //顯示可供選擇的時區列表
    timezoneList: function() {
      return timezoneList;
    }
  });
  //定義isEqual helper
  Template.registerHelper('isEqual', function(var1, var2) {
    return var1 === var2;
  });
}
