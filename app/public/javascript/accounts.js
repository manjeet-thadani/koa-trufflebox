$(document).ready(function () {
  var curraccount;
  var selectedAccount;
  var accounts;

  $.get('/accounts', function (response) {
    accounts = response.accounts || [];

    for (let i = 0; i < accounts.length; i++) {
      curraccount = accounts[i];
      $('#options').append("<option value='" + curraccount + "'>" + curraccount + "</option>");
    }
  })

  $('#submit').click(function () {
    selectedAccount = $('#options').val();

    $.get(`/accounts/${selectedAccount}`, function (response) {
      const balance = response.balance ? response.balance : 0;

      $('.select').removeClass("active");
      $('.send').addClass("active");
      $('#account').text(selectedAccount);
      $('#balance').text(balance);

      var all_accounts = [...accounts] // clone of accounts
      var current_account_index = all_accounts.indexOf(selectedAccount);
      all_accounts.splice(current_account_index, 1); //remove the selected account from the list of accounts you can send to.

      $('#all-accounts').addClass("active");
      var list = $('#all-accounts > ol');

      for (let i = 0; i < all_accounts.length; i++) {
        li = "<li>" + all_accounts[i] + "</li>";
        list.append(li)
      }
    })
  })

  $('#send').click(function () {
    $('#status').text("Sending...");

    let amount = $('#amount').val();
    let receiver = $('#receiver').val();
    
    $.post('/transfer', { amount: amount, sender: selectedAccount, receiver: receiver }, function (response) {
      $('#balance').text(response);
      $('#status').text("Sent!!");
    })
  });
})
