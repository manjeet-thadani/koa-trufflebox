$(document).ready(function () {
  var selectedAccount;
  var accounts;

  $.get('/accounts', function (response) {
    accounts = response.accounts || [];

    for (let i = 0; i < accounts.length; i++) {
      $('#options').append("<option value='" + accounts[i] + "'>" + accounts[i] + "</option>");
    }
  });

  $('#submit').click(function () {
    selectedAccount = $('#options').val();

    $.get(`/accounts/${selectedAccount}`, function (response) {
      var balance = response.balance ? response.balance : 0;

      $('.select').removeClass("active");
      $('.send').addClass("active");
      $('#account').text(selectedAccount);
      $('#balance').text(balance);

      // clone of accounts
      var allAccounts = [...accounts];
      var currentAccountIndex = allAccounts.indexOf(selectedAccount);

      // remove current account from list of all accounts before to which we need to send coin
      allAccounts.splice(currentAccountIndex, 1);

      $('#all-accounts').addClass("active");
      var list = $('#all-accounts > ol');

      for (let i = 0; i < allAccounts.length; i++) {
        li = "<li>" + allAccounts[i] + "</li>";
        list.append(li)
      }
    })
  });

  $('#send').click(function () {
    $('#status').text("Sending...");

    let amount = $('#amount').val();
    let receiver = $('#receiver').val();

    $.post('/transfer', { amount: amount, sender: selectedAccount, receiver: receiver })
      .done(function (response) {
        $('#status').text("Sent!!"); // set status to sent

        // update balance of current account
        $.get(`/accounts/${selectedAccount}`, function (response) {
          var balance = response.balance ? response.balance : 0;
          $('#balance').text(balance);
        })
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        $('#status').text("Error in sending coins");
      });
  });
});
