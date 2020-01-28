import favorite from './../../src/icons/favorite.icon.svg';
import favoriteFill from './../../src/icons/favorite-fill.icon.svg';
import gallery from './../../src/icons/gallery.icon.svg';
import mosaic from './../../src/icons/mosaic.icon.svg';
import grid from './../../src/icons/grid.icon.svg';
import list from './../../src/icons/list.icon.svg';
import deleteIcon from './../../src/icons/delete.icon.svg';
import change from './../../src/icons/change.icon.svg';
import edit from './../../src/icons/edit.icon.svg';
import place from './../../src/icons/place.icon.svg';
import person from './../../src/icons/person.icon.svg';
import cart from './../../src/icons/cart.icon.svg';
import search from './../../src/icons/search.icon.svg';
import starFill from './../../src/icons/star-fill.icon.svg';
import star from './../../src/icons/star.icon.svg';
import halfStar from './../../src/icons/half-star.icon.svg';
import arrowRight from './../../src/icons/arrow-right.icon.svg';
import arrowLeft from './../../src/icons/arrow-left.icon.svg';
import arrowUp from './../../src/icons/arrow-up.icon.svg';
import arrowDown from './../../src/icons/arrow-down.icon.svg';
import backward from './../../src/icons/backward.icon.svg';
import previous from './../../src/icons/previous.icon.svg';
import next from './../../src/icons/next.icon.svg';
import forward from './../../src/icons/forward.icon.svg';
import add from './../../src/icons/add.icon.svg';
import remove from './../../src/icons/remove.icon.svg';
import clock from './../../src/icons/clock.icon.svg';
import info from './../../src/icons/info.icon.svg';
import help from './../../src/icons/help.icon.svg';
import cancel from './../../src/icons/cancel.icon.svg';
import checkCircle from './../../src/icons/check-circle.icon.svg';
import check from './../../src/icons/check.icon.svg';
import warning from './../../src/icons/warning.icon.svg';
import error from './../../src/icons/error.icon.svg';
import drop from './../../src/icons/drop.icon.svg';
import close from './../../src/icons/close.icon.svg';
import file from './../../src/icons/file.icon.svg';
import deliveryExpress from './../../src/icons/delivery-express.icon.svg';
import priceLabel from './../../src/icons/price-label.icon.svg';
import store from './../../src/icons/store.icon.svg';
import mail from './../../src/icons/icon-mail.icon.svg';

import menu from './../../src/icons/menu.icon.svg';
import padlock from './../../src/icons/pad-lock.icon.svg';
import card from './../../src/icons/card.icon.svg';
import barcode from './../../src/icons/barcode.icon.svg';
import phone from './../../src/icons/phone.icon.svg';
import filterList from './../../src/icons/filter-list.icon.svg';
import filter from './../../src/icons/filter.icon.svg';
import thumbUp from './../../src/icons/thumb-up.icon.svg';
import camera from './../../src/icons/camera.icon.svg';
import pinOutline from './../../src/icons/pin-outline.icon.svg';
import orders from './../../src/icons/orders.icon.svg';
import prescription from './../../src/icons/prescription.icon.svg';
import outlineExit from './../../src/icons/outline-exit.icon.svg';
import welcome from './../../src/icons/welcome.icon.svg';
import postOffices from './../../src/icons/post-offices.icon.svg';
import shippingCompany from './../../src/icons/shipping-company.icon.svg';
import beauty from './../../src/icons/beauty.icon.svg';
import biological from './../../src/icons/biological.icon.svg';
import generic from './../../src/icons/generic.icon.svg';
import medicineNew from './../../src/icons/medicine-new.icon.svg';
import others from './../../src/icons/others.icon.svg';
import reference from './../../src/icons/reference.icon.svg';
import similarInt from './../../src/icons/similar-int.icon.svg';
import similar from './../../src/icons/similar.icon.svg';
import specific from './../../src/icons/specific.icon.svg';
import radiofarmaco from './../../src/icons/radiofarmaco.icon.svg';
import emptyCart from './../../src/icons/empty-cart.icon.svg';
import facebook from './../../src/icons/facebook.icon.svg';
import instagram from './../../src/icons/instagram.icon.svg';
import linkedin from './../../src/icons/linkedin.icon.svg';
import twitter from './../../src/icons/twitter.icon.svg';
import youtube from './../../src/icons/youtube.icon.svg';
import target from './../../src/icons/target.icon.svg';
import loader from './../../src/icons/loader.icon.svg';

const icons = [
  favorite,
  favoriteFill,
  mosaic,
  gallery,
  grid,
  list,
  deleteIcon,
  change,
  edit,
  place,
  person,
  cart,
  emptyCart,
  search,
  starFill,
  star,
  halfStar,
  arrowRight,
  arrowLeft,
  arrowUp,
  arrowDown,
  backward,
  previous,
  next,
  forward,
  add,
  remove,
  clock,
  info,
  help,
  cancel,
  checkCircle,
  check,
  warning,
  error,
  drop,
  close,
  file,
  menu,
  padlock,
  card,
  barcode,
  phone,
  filterList,
  filter,
  thumbUp,
  deliveryExpress,
  priceLabel,
  store,
  mail,
  camera,
  pinOutline,
  orders,
  prescription,
  outlineExit,
  welcome,
  postOffices,
  shippingCompany,
  beauty,
  biological,
  generic,
  medicineNew,
  others,
  reference,
  similarInt,
  similar,
  specific,
  radiofarmaco,
  facebook,
  instagram,
  linkedin,
  twitter,
  youtube,
  target,
  loader,
];

export default {
  data() {
    return { icons };
  },

  methods: {
    $getIcon(name) {
      return this.icons.find((icon) => icon.id === `${name}.icon`);
    }
  }
};
