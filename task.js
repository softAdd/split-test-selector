let Url = function(Share, Address) {
  this.share = Share;
  this.priority = 0;
  this.users = 0;
  this.calculatedShare = 0;
  this.address = Address;
};

var users = 0;

let urls = [];

function sumShare() {
  let sumShare = 0;
  for (let i = 0; i < urls.length; i++) {
    sumShare += urls[i].share;
  }
  return sumShare;
}
var totalShare = sumShare();

function setPrioritiesAndSort() {
  for (let i = 0; i < urls.length; i++) {
    for (let j = 0; j < urls.length; j++) {
      if (urls[i].share > urls[j].share && i != j) {
        urls[i].priority++;
      }
    }
  }

  //last added object will receive maximum priority
  //if it has equal priority
  for (let i = 0; i < urls.length; i++) {
    for (let j = 0; j < urls.length; j++) {
      if (urls[i].priority == urls[j].priority && i != j) {
        if (i > j) {
          urls[i].priority++;
        }
      }
    }
  }
  //sort massive by priority (to lower)
  let exchange;
  for (let i = 0; i < urls.length; i++) {
    for (let j = 0; j < urls.length; j++) {
      if (urls[i].priority > urls[j].priority) {
        exchange = urls[i];
        urls[i] = urls[j];
        urls[j] = exchange;
      }
    }
  }
}
setPrioritiesAndSort();

function onUserAppearance() {
  users++;
  return redirect(urls);
}

function udpateUrls(urls) {
  for (let i = 0; i < urls.length; i++) {
    urls[i].calculatedShare = (totalShare / users) * urls[i].users;
  }
}

function redirect(urls) {
  let result;
  for (let i = 0; i < urls.length; i++) {
    if (urls[i].calculatedShare < urls[i].share) {
      urls[i].users++;
      result = i;
      break;
    } else if (urls[i].calculatedShare == urls[i].share || i == urls.length) {
      urls[0].users++;
      result = i;
      break;
    }
  }
  udpateUrls(urls);
  return result;
}

exports.onUserAppearance = onUserAppearance;
exports.urls = urls;
exports.Url = Url;
