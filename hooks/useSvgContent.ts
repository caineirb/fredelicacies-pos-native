import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

export type IconProps = {
  color?: string;
  size?: number;
};

// Custom hook for loading SVG content
const useSvgContent = (assetModule: any) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();
        
        if (asset.localUri) {
          const response = await fetch(asset.localUri);
          const content = await response.text();
          setSvgContent(content);
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadContent();
  }, [assetModule]);

  return svgContent;
};

export default useSvgContent;