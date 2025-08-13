import affiliatesData from '@/data/affiliates.json';

export interface Affiliate {
  sku: string;
  title: string;
  url: string;
  image: string;
  price: string;
  source: string;
}

export const getAffiliatesBySkus = (skus: string[]): Affiliate[] => {
  return affiliatesData.filter(affiliate => 
    skus.includes(affiliate.sku)
  ) as Affiliate[];
};

export const getAllAffiliates = (): Affiliate[] => {
  return affiliatesData as Affiliate[];
};