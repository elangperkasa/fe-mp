import { styled } from '@mui/material';
import { paths } from 'src/pages/paths';

// ----------------------------------------------------------------------
const FloatingButton = styled('a')(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '100px', // Adjust size as needed
  height: '100px', // Adjust size as needed
  background: `url('./assets/icons/app/cs.png') no-repeat center center`, // Update with the correct path to your image
  backgroundSize: 'contain',
  zIndex: 1000,
  textDecoration: 'none',
}));

const TextContainer = styled('div')({
  position: 'fixed',
  right: '130px',
  bottom: '50px',
  zIndex: 1000,
  fontSize: '12px', // Adjust font size as needed
  color: 'white', // Adjust color as needed
  backgroundColor: '#004EA8', // Optional: Background for better visibility
  padding: '10px', // Optional: Padding around the text
  borderRadius: '5px', // Optional: Rounded corners
  fontWeight: '600',
});

export default function CallButton() {
  const whatsappNumber = '000';
  const whatsappMessage = 'Halo! Saya butuh bantuan terkait Program Click N Win';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  return (
    <>
      <TextContainer>Tanya Click&Win</TextContainer>
      <FloatingButton href={whatsappUrl} target="_blank" rel="noopener noreferrer" />
    </>
  );
}
