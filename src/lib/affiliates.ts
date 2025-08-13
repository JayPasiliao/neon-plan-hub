export interface AffiliateProduct {
  sku: string;
  title: string;
  description?: string;
  url: string;
  image: string;
  price?: string;
  source: string;
}

let affiliatesData: AffiliateProduct[] | null = null;

export async function getAffiliates(): Promise<AffiliateProduct[]> {
  if (affiliatesData) {
    return affiliatesData;
  }

  try {
    const response = await fetch('/data/affiliates.json');
    affiliatesData = await response.json();
    return affiliatesData;
  } catch (error) {
    console.error('Failed to load affiliates:', error);
    return [];
  }
}

export function getAffiliatesBySkus(skus: string[]): AffiliateProduct[] {
  if (!affiliatesData) {
    return [];
  }
  
  return affiliatesData.filter(affiliate => 
    skus.includes(affiliate.sku)
  );
}

export function getAffiliateBySku(sku: string): AffiliateProduct | undefined {
  if (!affiliatesData) {
    return undefined;
  }
  
  return affiliatesData.find(affiliate => affiliate.sku === sku);
}