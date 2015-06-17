//index.js

//Template只作用於使用者端，因此相關程式碼也應只在使用者端作用
if (Meteor.isClient) {
  //定義各時鐘的預設使用資料
  var dataOfClock1 = new ReactiveVar({
    timezone: 'Asia/Taipei',
    timezoneAdjust: 28800000
  });
  var dataOfClock2 = new ReactiveVar({
    timezone: 'America/New_York',
    timezoneAdjust: -14400000
  });
  var dataOfClock3 = new ReactiveVar({
    timezone: 'UTC',
    timezoneAdjust: 0
  });

  //定義body中#with使用的helpers
  Template.registerHelper('dataOfClock1', function() {
    return dataOfClock1.get();
  });
  Template.registerHelper('dataOfClock2', function() {
    return dataOfClock2.get();
  });
  Template.registerHelper('dataOfClock3', function() {
    return dataOfClock3.get();
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

  //在template clock裡註冊名為nowString的helpers
  Template.clock.helpers({
    nowString: function() {
      //取得data context裡設定的時區修正值
      var timezoneAdjust = this.timezoneAdjust;
      //將utc時間加上時區修正值
      var currentTimeInTimezone = currentUTCTime.get().getTime() + timezoneAdjust;
      return new Date(currentTimeInTimezone).toLocaleString();
    }
  });
}
