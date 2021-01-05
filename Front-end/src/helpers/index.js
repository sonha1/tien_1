// fn: hàm rút gọn tên sản phẩm
const reduceProductName = (name, length = 64) => {
  let result = name;
  if (name && name.length >= length) {
    result = name.slice(0, length) + ' ...';
  }
  return result;
};

// fn: hàm format giá sản phẩm
const formatProductPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

// fn: tính tỉ lệ sao của sản phẩm [1,2,3,4,5]
const calStar = (rates) => {
  const total = rates.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let rateTotal = 0;
  for (let i = 0; i < 5; ++i) {
    rateTotal += rates[i] * (i + 1);
  }
  return rateTotal / total;
};

// fn: chuyển key product thành tiếng Việt, vd: color => màu sắc
const convertProductKey = (key) => {
  switch (key) {
    case 'brand':
      return 'Thương hiệu';
    case 'aperture':
      return 'Khẩu độ';
    case 'focalLength':
      return 'Tiêu cự';
    case 'sensor':
      return 'Cảm biến';
    case 'numberOfPixel':
      return 'Số điểm ảnh';
    case 'resolution':
      return 'Độ phân giải';
    case 'warranty':
      return 'Bảo hành';
    case 'connectionStd':
      return 'Chuẩn kết nối';
    case 'frameSpeed':
      return 'Tốc độ khung hình';
    case 'capacity':
      return 'Dung lượng';
    case 'size':
      return 'Kích thước';
    case 'type':
      return 'Loại';
    case 'readSpeed':
      return 'Tốc độ đọc';
    case 'writeSpeed':
      return 'Tốc độ ghi';
    case 'rpm':
      return 'Tốc độ vòng quay';
    case 'manufacturer':
      return 'Nhà sản xuất';
    case 'chipBrand':
      return 'Nhãn hiệu chip';
    case 'processorCount':
      return 'Số lượng cpu';
    case 'series':
      return 'Series';
    case 'detail':
      return 'Chi tiết khác';
    case 'displaySize':
      return 'Kích thước màn hình';
    case 'display':
      return 'Card màn hình';
    case 'operating':
      return 'Hệ điều hành';
    case 'disk':
      return 'Ổ cứng';
    case 'ram':
      return 'RAM';
    case 'pin':
      return 'Dung lượng pin';
    case 'weight':
      return 'Khối lượng';
    case 'chipset':
      return 'Chip set';
    case 'socketType':
      return 'Loại socket';
    case 'bus':
      return 'Loại bus';
    case 'numberOfPort':
      return 'Số lượng cổng';
    case 'color':
      return 'Màu sắc';
    case 'cpu':
      return 'Cpu';
    case 'before':
      return 'Camera trước';
    case 'after':
      return 'Camera sau';
    case 'voltage':
      return 'Loại sạc';
    case 'ledColor':
      return 'Màu led';
    case 'frequency':
      return 'Tần số quét';
    case 'port':
      return 'Cổng';
    case 'bgPlate':
      return 'Tấm nền';
    case 'isLed':
      return 'Loại led';
    case 'bandwidth':
      return 'Băng thông';
    case 'strong':
      return 'Độ mạnh ăng-ten';
    case 'connectionPort':
      return 'Cổng kết nối';
    case 'wattage':
      return 'Công suất';
    default:
      return 'Chi tiết khác';
  }
};

// fn: chuyên width màn hình window -> size theo ant design
const convertWidthScreen = (size = 576) => {
  if (size < 576) return 'xs';
  if (size >= 576 && size < 768) return 'sm';
  if (size >= 768 && size < 992) return 'md';
  if (size >= 992 && size < 1200) return 'lg';
  if (size >= 1200 && size < 1600) return 'xl';
  return 'xxl';
};

// fn: Hàm chuyển rate thành text
const convertRateToText = (rate = 0) => {
  switch (rate) {
    case 0:
      return 'Sản phẩm quá tệ';
    case 1:
      return 'Sản phẩm không tốt';
    case 2:
      return 'Sản phẩm bình thường';
    case 3:
      return 'Sản phẩm tốt';
    case 4:
      return 'Cực kỳ hài lòng';
    default:
      return 'Sản phẩm bình thường';
  }
};

// fn: format thời gian
const formatDate = (date = new Date().getTime()) => {
  const d = new Date(date);
  const y = d.getFullYear(),
    m = d.getMonth(),
    day = d.getDate();

  return `${day} tháng ${m + 1}, ${y}`;
};

//fn: chuyển loại sản phẩm từ số thành Model
const convertProductType = (type = 0) => {
  switch (type) {
    case 0:
      return 'Laptop';
    case 1:
      return 'Ổ cứng';
    case 2:
      return 'Card màn hình';
    case 3:
      return 'Mainboard';
    case 4:
      return 'RAM';
    case 5:
      return 'Điện thoại';
    case 6:
      return 'Sạc dự phòng';
    case 7:
      return 'Tai nghe';
    case 8:
      return 'Bàn phím';
    case 9:
      return 'Màn hình';
    case 10:
      return 'Chuột';
    case 11:
      return 'Router Wifi';
    case 12:
      return 'Loa';
    case 13:
      return 'Camera';
    case 14:
      return 'Webcam';
    default:
      return 'Khác';
  }
};

// fn: Chuyển series laptop sang chữ
const convertSeriesChipCpu = (series = 0) => {
  switch (series) {
    case 0:
      return 'Core i3';
    case 1:
      return 'Core i5';
    case 2:
      return 'Core i7';
    case 3:
      return 'Core i9';
    case 4:
      return 'Ryzen 3';
    case 5:
      return 'Ryzen 5';
    case 6:
      return 'Ryzen 7';
    case 7:
      return 'Pentium';
    case 8:
      return 'Celeron';
    default:
      return 'Core i3';
  }
};

// fn: chuyển đổi series chip
const convertSeriesChip = (series = 0) => {
  switch (series) {
    case 0:
      return 'Core i3';
    case 1:
      return 'Core i5';
    case 2:
      return 'Core i7';
    case 3:
      return 'Core i9';
    case 4:
      return 'Ryzen 3';
    case 5:
      return 'Ryzen 5';
    case 6:
      return 'Ryzen 7';
    case 7:
      return 'Pentium';
    case 8:
      return 'Celeron';
    default:
      return 'Khác';
  }
};

// fn: chuyển đổi kích thước ổ cứng
const convertDiskSize = (size = 0) => {
  switch (size) {
    case 0:
      return `2.5"`;
    case 1:
      return `3.5"`;
    case 2:
      return 'M.2 2880';
    case 3:
      return 'M2';
    default:
      return 'Khác';
  }
};

// fn: chuyển đổi chuẩn kêt nối ổ cứng
const convertDiskConnectionStd = (std = 0) => {
  switch (std) {
    case 0:
      return 'SATA 3';
    case 1:
      return 'USB 3.0';
    case 2:
      return 'M.2 SATA';
    case 3:
      return 'M.2 NVMe';

    default:
      return 'Khác';
  }
};

// fn: chuyển đổi loại socket
const convertMainboardSocket = (socketType = 0) => {
  switch (socketType) {
    case 0:
      return '1151-v2';
    case 1:
      return '1200';
    case 2:
      return 'AM4';
    case 3:
      return '1151';
    case 4:
      return 'sTRX';
    default:
      'Khác';
  }
};

// fn: chuyển đổi chuẩn kích thước mainboard
const convertMainboardSizeStd = (sizeStd = 0) => {
  switch (sizeStd) {
    case 0:
      return 'Micro-ATX';
    case 1:
      return 'ATX';
    case 2:
      return 'Extend-ATX';
    case 3:
      return 'Mini-ATX';
    case 4:
      return 'XL-ATX';
    default:
      break;
  }
};

// fn: chuyên đổi loại tai nghe
const convertHeadphoneType = (type = 0) => {
  switch (type) {
    case 0:
      return 'Over-ear';
    case 1:
      return 'In-ear';
    case 2:
      return 'On-ear';
    case 3:
      return 'KHT';
    default:
      return 'Khác';
  }
};

// fn: Chuyển đổi chuẩn kết nối tai nghe
const convertHeadphoneConnectionStd = (std = 0) => {
  switch (std) {
    case 0:
      return '3.5mm';
    case 1:
      return 'Bluetooth';
    case 2:
      return 'USB';
    case 3:
      return 'Bluetooth 4.0';
    case 4:
      return 'Bluetooth 5.0';
    case 5:
      return '2.4 GHz Wireless';
    default:
      return 'Khác';
  }
};

// fn: Chuyên đổi màu bàn phím
const convertKeyBoardColor = (color = 0) => {
  switch (color) {
    case 0:
      return 'Màu đen';
    case 1:
      return 'Màu bạc';
    case 2:
      return 'Màu trắng';
    case 3:
      return 'Màu hồng';

    default:
      'Khác';
  }
};

// fn: Chuyên đổi led bàn phím
const convertKeyBoardLed = (led = 0) => {
  switch (led) {
    case 0:
      return 'Không led';
    case 1:
      return 'Đơn sắc';
    case 2:
      return 'Rainbow';
    case 3:
      return 'RGB';
    default:
      'Khác';
  }
};

// fn: chuyển đổi tấm nền màn hình
const convertBgPlate = (bgPlate) => {
  switch (bgPlate) {
    case 0:
      return 'IPS';
    case 1:
      return 'VA';
    case 2:
      return 'TN';
    case 3:
      return 'PLS';
    case 4:
      return 'MVA';
    case 5:
      return 'KHT';
    default:
      'Khác';
  }
};

// fn: chuyển đổi độ phân giải
const convertMonitorResolution = (res = 0) => {
  switch (res) {
    case 0:
      return '1920 x 1080';
    case 1:
      return '2560 x 1440';
    case 2:
      return '1366 x 768';
    case 3:
      return '1600 x 900';
    case 4:
      return '3840 x 2160';
    case 5:
      return '2560 x 1080';
    case 6:
      return '3440 x 1440';
    default:
      return '1920 x 1080';
  }
};

// fn: Chuyển đổi giá trị product từ number sang string
const convertProductValue = (type = 0, product) => {
  if (product === null || product === undefined) return product;
  switch (type) {
    // laptop
    case 0:
      const { cpu } = product;
      return {
        ...product,
        cpu: { ...cpu, series: convertSeriesChip(cpu.series) },
      };
    // disk
    case 1:
      const { size, connectionStd } = product;
      const newType = product.type ? 'SSD' : 'HDD';
      return {
        ...product,
        size: convertDiskSize(size),
        type: newType,
        connectionStd: convertDiskConnectionStd(connectionStd),
      };
    // display
    case 2:
      const { manufacturer } = product;
      const newManuf = manufacturer ? 'AMD' : 'NVIDIA';
      return { ...product, manufacturer: newManuf };
    // main board
    case 3:
      const { socketType, sizeStd } = product;
      return {
        ...product,
        socketType: convertMainboardSocket(socketType),
        sizeStd: convertMainboardSizeStd(sizeStd),
      };
    // ram
    case 4:
      const newRamType =
        product.type === 0 ? 'DDR3' : product.type === 1 ? 'DDR3L' : 'DDR4';
      return { ...product, type: newRamType };
    // mobile
    case 5:
      const newOps = product.operating ? 'IOS' : 'Android';
      return { ...product, operating: newOps };
    // headphone
    case 7:
      const newHeadphoneType = convertHeadphoneType(product.type);
      const newHPConnectionStd = convertHeadphoneConnectionStd(
        product.connectionStd,
      );
      return {
        ...product,
        type: newHeadphoneType,
        connectionStd: newHPConnectionStd,
      };
    //  keyboard
    case 8:
      const newKBType =
        product.type === 0
          ? 'Bàn phím thường'
          : product.type === 1
          ? 'Bàn phím giả cơ'
          : 'Bàn phím cơ';
      const newColor = convertKeyBoardColor(product.color);
      const newLed = convertKeyBoardLed(product.ledColor);
      return { ...product, type: newKBType, color: newColor, ledColor: newLed };
    // monitor
    case 9:
      return {
        ...product,
        bgPlate: convertBgPlate(product.bgPlate),
        resolution: convertMonitorResolution(product.resolution),
      };
    //  mouse
    case 10:
      return {
        ...product,
        type: product.type ? 'Không dây' : 'Có dây',
        isLed: product.isLed ? 'Có led' : 'Không led',
      };
    // router
    case 11:
      return {
        ...product,
        bandwidth: product.bandwidth ? '2.4 GHz/5 GHz' : '2.4 GHz',
      };
    // webcam
    case 14:
      const newResolution =
        product.resolution === 0
          ? '720p'
          : product.resolution === 1
          ? '1280 x 720'
          : '1920 x 1080';
      return {
        ...product,
        connectionStd: product.connectionStd ? 'USB 2.0' : 'USB',
        resolution: newResolution,
      };
    default:
      return product;
  }
};

export default {
  convertProductValue,
  reduceProductName,
  formatProductPrice,
  calStar,
  convertProductKey,
  convertWidthScreen,
  convertRateToText,
  convertProductType,
  formatDate,
  convertSeriesChipCpu,
};
