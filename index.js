//index.js

//Template只作用於使用者端，因此相關程式碼也應只在使用者端作用
if (Meteor.isClient) {
  //紀錄template clock instance的編號
  var clockInstanceNumber = 0;
  //當模版被建立的時候執行之
  Template.clock.onCreated(function() {
    var instance = this;
    //每次有模版被創建時都將紀錄編號+1
    clockInstanceNumber += 1;
    //紀錄模板編號到instance上
    instance.number = clockInstanceNumber;
    //紀錄當前時間
    instance.timer = new ReactiveVar( new Date() );
    //定時更新當前時間
    instance.interval = Meteor.setInterval(
      function() {
        instance.timer.set( new Date() );
      }, 
      1000
    );
  });
  //當模版DOM在網頁上被建立時
  Template.clock.onRendered(function() {
    var instance = this;
    //若模版編號是偶數，背景為綠色
    if (instance.number % 2 === 0) {
      instance.$('div').css('background', '#00FF00');
    }
    //否則為紅色
    else {
      instance.$('div').css('background', '#FF0000');
    }
  });
  //當模版被移除時
  Template.clock.onDestroyed(function() {
    var instance = this;
    //停止計時器
    Meteor.clearInterval( instance.interval );
  });

  //在template clock裡註冊名為nowString的helpers
  Template.clock.helpers({
    nowString: function() {
      var instance = Template.instance();
      return instance.timer.get().toLocaleString();
    }
  });
}
