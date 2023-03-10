const ProductModel = require('../models/product.models/product.model');
const { cloudinary } = require('../configs/cloudinary.config');
const ProductDescModel = require('../models/product.models/description.model');
const constants = require('../constants');
const LaptopModel = require('../models/product.models/computer.models/laptop.model');
const DiskModel = require('../models/product.models/computer.models/disk.model');
const DisplayModel = require('../models/product.models/computer.models/display.model');
const MainboardModel = require('../models/product.models/computer.models/mainboard.model');
const RamModel = require('../models/product.models/computer.models/ram.model');
const MobileModel = require('../models/product.models/mobile.models/mobile.model');
const BackupChargerModel = require('../models/product.models/mobile.models/backupCharger.model');
const KeyboardModel = require('../models/product.models/peripherals.models/keyboard.model');
const HeadphoneModel = require('../models/product.models/peripherals.models/headphone.model');
const MonitorModel = require('../models/product.models/peripherals.models/monitor.model');
const MouseModel = require('../models/product.models/peripherals.models/mouse.model');
const RouterModel = require('../models/product.models/peripherals.models/router.model');
const SpeakerModel = require('../models/product.models/peripherals.models/speaker.model');
const CameraModel = require('../models/product.models/camera.models/camera.model');
const WebcamModel = require('../models/product.models/camera.models/webcam.model');
const helpers = require('../helpers');
const AdminModel = require('../models/account.models/admin.model');
const UserModel = require('../models/account.models/user.model');
const AccountModel = require('../models/account.models/account.model');
const OrderModel = require('../models/order.model');

// fn: upload product avatar to cloudinary
const uploadProductAvt = async (avtFile, productCode) => {
  try {
    const result = await cloudinary.uploader.upload(avtFile, {
      folder: `products/${productCode}`,
    });
    const { secure_url } = result;
    return secure_url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fn: upload product catalogs to cloudinary
const uploadProductCatalogs = async (catalogs, productCode) => {
  try {
    const urlCatalogs = [];
    for (let item of catalogs) {
      const result = await cloudinary.uploader.upload(item, {
        folder: `products/${productCode}`,
      });
      urlCatalogs.push(result.secure_url);
    }
    return urlCatalogs;
  } catch (error) {
    throw error;
  }
};

// fn: upload product desc photo to cloudinary
const uploadDescProductPhoto = async (desc, productCode) => {
  try {
    let result = [];
    for (let item of desc) {
      const { content, photo } = item;
      const resUpload = await cloudinary.uploader.upload(photo, {
        folder: `products/${productCode}/desc`,
      });
      result.push({ content, photo: resUpload.secure_url });
    }
    return result;
  } catch (error) {
    throw error;
  }
};

// fn: T???o chi ti???t cho m???t s???n ph???m
const createProductDetail = async (type, product) => {
  try {
    switch (type) {
      case constants.PRODUCT_TYPES.LAPTOP: {
        const { chipBrand, processorCount, series, detail, ...rest } = product;
        const cpu = { chipBrand, processorCount, series, detail };
        return await LaptopModel.create({ cpu, ...rest });
      }
      case constants.PRODUCT_TYPES.DISK: {
        const { type } = product;
        let speed = null;
        if (type) {
          const { readSpeed, writeSpeed, ...rest } = product;
          speed = { readSpeed, writeSpeed };
          return await DiskModel.create({ speed, ...rest });
        } else {
          const { rpm, ...rest } = product;
          return await DiskModel.create({ speed: { rpm }, ...rest });
        }
      }
      case constants.PRODUCT_TYPES.DISPLAY:
        return await DisplayModel.create({ ...product });
      case constants.PRODUCT_TYPES.MAIN_BOARD:
        return await MainboardModel.create({ ...product });
      case constants.PRODUCT_TYPES.RAM:
        return await RamModel.create({ ...product });
      case constants.PRODUCT_TYPES.MOBILE: {
        const { afterCamera, beforeCamera, ...rest } = product;
        const cameras = { before: beforeCamera, after: afterCamera };
        return await MobileModel.create({ cameras, ...rest });
      }
      case constants.PRODUCT_TYPES.BACKUP_CHARGER:
        return await BackupChargerModel.create({ ...product });
      case constants.PRODUCT_TYPES.HEADPHONE:
        return await HeadphoneModel.create({ ...product });
      case constants.PRODUCT_TYPES.KEYBOARD:
        return await KeyboardModel.create({ ...product });
      case constants.PRODUCT_TYPES.MONITOR:
        return await MonitorModel.create({ ...product });
      case constants.PRODUCT_TYPES.MOUSE:
        return await MouseModel.create({ ...product });
      case constants.PRODUCT_TYPES.ROUTER:
        return await RouterModel.create({ ...product });
      case constants.PRODUCT_TYPES.SPEAKER:
        return await SpeakerModel.create({ ...product });
      case constants.PRODUCT_TYPES.CAMERA:
        return await CameraModel.create({ ...product });
      case constants.PRODUCT_TYPES.WEBCAM:
        return await WebcamModel.create({ ...product });
      default:
        throw new Error('Lo???i s???n ph???m kh??ng h???p l???');
    }
  } catch (error) {
    throw error;
  }
};

// api: Th??m s???n ph???m
const addProduct = async (req, res, next) => {
  try {
    const { product, details, desc } = req.body;

    const { type, avatar, code, ...productRest } = product;
    const { warranty, catalogs, ...detailRest } = details;
    // ki???m tra s???n ph???m ???? t???n t???i hay ch??a
    const isExist = await ProductModel.exists({ code });
    if (isExist) {
      return res.status(400).json({ message: 'M?? s???n ph???m ???? t???n t???i !' });
    }
    // upload product avatar to cloudinary
    const avtUrl = await uploadProductAvt(avatar, code);

    // upload ???nh kh??c c???a s???n ph???m
    const urlCatalogs = await uploadProductCatalogs(catalogs, code);

    // upload ???nh b??i vi???t m?? t???
    let productDesc = desc
      ? await uploadDescProductPhoto(desc.detailDesList, code)
      : null;

    //T???o s???n ph???m m???i
    const newProduct = await ProductModel.create({
      type,
      code,
      avt: avtUrl,
      ...productRest,
    });

    // T???o sp th??nh c??ng th?? t???o chi ti???t s???n ph???m theo t???ng lo???i
    if (newProduct) {
      const { _id } = newProduct;
      // T???o b??i vi???t m?? t???
      const newDesc = productDesc
        ? await ProductDescModel.create({
            idProduct: _id,
            title: desc.title,
            desc: productDesc,
          })
        : null;

      // T???o chi ti???t s???n ph???m
      const newProductDetail = await createProductDetail(type, {
        idProduct: _id,
        details: newDesc ? newDesc._id : null,
        warranty,
        catalogs: urlCatalogs,
        ...detailRest,
      });

      if (newProductDetail) {
        return res.status(200).json({ message: 'Th??m s???n ph???m th??nh c??ng' });
      }
    }
  } catch (error) {
    return res.status(409).json({ message: 'L???i ???????ng truy???n, th??? l???i' });
  }
};

// api: L???y danh s??ch s???n ph???m theo lo???i v?? trang
const getProductListByType = async (req, res, next) => {
  try {
    const { type, page, perPage } = req.query;
    const nSkip = (parseInt(page) - 1) * perPage;
    const numOfProduct = await ProductModel.countDocuments({ type });
    const result = await ProductModel.find({ type })
      .skip(nSkip)
      .limit(parseInt(perPage));
    return res.status(200).json({ count: numOfProduct, data: result });
  } catch (error) {
    throw error;
  }
};

// api: Xo?? m???t s???n ph???m
const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.query;
    const response = await ProductModel.findById(id).select('type');
    if (response) {
      // xo?? s???n ph???m
      await ProductModel.deleteOne({ _id: id });
      // xo?? b??i m?? t??? s???n ph???m
      await ProductDescModel.deleteOne({ idProduct: id });
      const { type } = response;
      // xo?? chi ti???t s???n ph???m
      const Model = helpers.convertProductType(type);
      await Model.deleteOne({ idProduct: id });
    }
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(409).json({ message: 'Xo?? s???n ph???m th???t b???i' });
  }
};

// api: C???p nh???t s???n ph???m
const updateProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const { _id, ...rest } = product;
    const result = await ProductModel.updateOne(
      { _id: product._id },
      { ...rest },
    );
    if (result && result.ok === 1) {
      return res.status(200).json({ message: 'success' });
    }
  } catch (error) {
    console.error(error);
    return res.status(409).json({ message: 'failed' });
  }
};

// api: ????ng nh???p v???i admin
const postLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    console.log(userName, password);
    const adminUser = await AdminModel.findOne({
      username: userName,
      password,
    });
    console.log(await AdminModel.find({}));
    if (adminUser) {
      return res.status(200).json({ name: adminUser.fullName });
    } else {
      return res.status(400).json({ message: 'failed' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'failed' });
  }
};

// api: l???y danh s??ch user admin
const getUserAdminList = async (req, res, next) => {
  try {
    const list = await AdminModel.find({}).select('-password');
    if (list) {
      return res.status(200).json({ list });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'failed' });
  }
};

// api: l???y danh s??ch ng?????i d??ng
const getCustomerList = async (req, res, next) => {
  try {
    const list = await UserModel.find({}).populate({
      path: 'accountId',
      select: 'email authType -_id',
    });
    return res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ list: [] });
  }
};

// api: xo?? 1 ng?????i d??ng
const delCustomer = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const customer = await UserModel.findById(userId);
    if (customer) {
      await AccountModel.deleteOne({ _id: customer.accountId });
      await UserModel.deleteOne({ _id: userId });
      return res.status(200).json({});
    }
  } catch (error) {
    return res.status(409).json({});
  }
};

// api: l???y danh s??ch ????n h??ng
const getOrderList = async (req, res, next) => {
  try {
    const list = await OrderModel.find({}).select('-deliveryAdd -note');
    return res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    return res.status(401).json({});
  }
};

// api: c???p nh???t tr???ng th??i ????n h??ng
const postUpdateOrderStatus = async (req, res, next) => {
  try {
    const { id, orderStatus } = req.body;
    const response = await OrderModel.updateOne({ _id: id }, { orderStatus });
    if (response) return res.status(200).json({});
  } catch (error) {
    return res.status(401).json({});
  }
};

module.exports = {
  addProduct,
  getProductListByType,
  removeProduct,
  updateProduct,
  postLogin,
  getUserAdminList,
  getCustomerList,
  delCustomer,
  getOrderList,
  postUpdateOrderStatus,
};
