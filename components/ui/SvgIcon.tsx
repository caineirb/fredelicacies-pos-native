import useSvgContent, { IconProps } from '@/hooks/useSvgContent';
import { SvgXml } from 'react-native-svg';

const SvgIcon: React.FC<IconProps & { assetModule: any }> = ({ 
  color,
  size = 30,
  assetModule
}) => {
  let svgContent = useSvgContent(assetModule);

  // Replace stroke and fill colors in SVG with the provided color
  if (svgContent && color) {
    svgContent = svgContent.replace(/stroke="#([A-Fa-f0-9]{3,6})"/g, `stroke="${color}"`);
    svgContent = svgContent.replace(/fill="#([A-Fa-f0-9]{3,6})"/g, `fill="${color}"`);
  }

  if (!svgContent) return null;

  return (
    <SvgXml
      xml={svgContent}
      width={size}
      height={size}
    />
  );
};

export default SvgIcon;