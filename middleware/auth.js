export default async function ({ store, redirect, route }) {
  if (!store.$cookies.get('jasonAdminUser')) {
    await store.dispatch('logout');
    if (route.path != '/login') {
      store.$cookies.set('rebackUrl', route.path);
      if (route.query) store.$cookies.set('rebackQuery', route.query);
    }
    return redirect(encodeURI('/login?message=請登入網站再開始用好嗎🙄🙄🙄'));
  } else {
    await store.dispatch('getMenuAndStatus');
    switch (store.state.status) {
      case -1:
        return redirect(encodeURI('/login?message=無註帳帳號。'));
      case 0:
        return redirect(encodeURI('/login?message=帳號停權。'));
    }
    //  檢查頁面權限
    let check = false;
    let menuTitle = null;
    let menuSubTitle = null;
    if (route.path == '/') {
      check = true;
    } else {
      store.state.menu.forEach(pages => {
        if (check) return false;
        if (pages.children && pages.link == null) {
          pages.children.forEach(children => {
            if (check) return false;

            let path = children.link.split('/');
            let childrenLink = [ '/detail/' + path[2] + '/id', '/sort/' + path[2], '/add/' + path[2], '/' + children.label ];
            path.forEach((key, index, array) => { if (route.params[key]) { array[index] = route.params[key]; } });
            if (path.join('/') == route.path) { check = true; menuTitle = pages.label; menuSubTitle = children.label; return false; }

            childrenLink.forEach(key => {
              let keyPath = key.split('/');
              keyPath.forEach((item, index, array) => { if (route.params[item]) { array[index] = route.params[item]; } });
              if (keyPath.join('/') == route.path) { check = true; menuTitle = pages.label; menuSubTitle = children.label; return false; }
            });
          });
        } else {
          check = true;
          return false;
        }
      });
    }

    if (!check) {
      redirect(encodeURI('/?prompt=無此頁面權限。'));
    } else {
      store.dispatch('setMenuTitle', menuTitle);
      store.dispatch('setActiveMenu', menuSubTitle);
    }
  }
}
