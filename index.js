//Template只作用於使用者端，因此相關程式碼也應只在使用者端作用
if (Meteor.isClient) {
  //在template clock裡註冊名為nowString的helpers
  Template.clock.helpers({
    nowString: function() {
      return Session.get('now').toLocaleString();
    }
  });

  //設定now session的值為當前系統時間
  Session.setDefault('now', new Date());
  //每秒都將最新的系統時間更新到now session裡
  Meteor.setInterval(
    function() {
      Session.set('now', new Date());
    }, 
    1000
  );
}
