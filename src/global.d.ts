declare global {
  type ModalProps = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

  type CardParam = {
    param: string;
    key: string;
    path: string;
  };

  type CardParams = {
    id: number;
    title: string;
    params: CardParam[];
  };

  type CartItem = {
    section: Sections;
    id: number;
    quantity: number;
  };

  type Sections =
    | "motherboards"
    | "cpus"
    | "videocards"
    | "ram"
    | "memory"
    | "power"
    | "frames"
    | "periphery";

  type KeysOfDescriptionInfo = keyof DescriptionInfo;

  type DescriptionInfo = {
    power?: string;
    certificate?: string;
    protection?: string;
    diagonal?: string;
    curved?: string;
    resolution?: string;
    switches?: string;
    type?: string;
    memory?: string;
    dram?: boolean;
    nvme?: boolean;
    read?: string;
    write?: string;
    frequency?: string;
    tdp?: string;
    cpu?: string;
    form?: string;
    light?: boolean;
    color?: string;
    ram_type?: string;
    socket?: string;
    value?: string;
    motherboards?: string;
    timing?: string;
    manufacturer?: string;
    language?: string;
    interface?: string;
  };

  type CrucialInfo = {
    title: string;
    key: KeysOfDescriptionInfo;
  };

  type GalleryCard = {
    id: number;
    path: string;
    title: string;
    url: string;
    crucialInfo: CrucialInfo[];
  };

  type CatalogObject = {
    id: number;
    fullname?: string;
    brand: string;
    type?: string;
    model?: string;
    price: number;
    inStock: number;
    images: string[];
    country: string;
    guarantee: number;
    size: {
      length?: number;
      width: number;
      height: number;
      weigh: number;
    };
    info: DescriptionInfo;
  };
}

export {};
