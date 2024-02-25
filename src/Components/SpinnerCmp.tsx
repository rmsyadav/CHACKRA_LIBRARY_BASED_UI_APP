import { Box} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import "../EntryComponent/App.css";

const Spinercmp = ():React.ReactElement => {
	return (
		<Box className='loadingIcon'><Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /></Box>
	);
};

export default Spinercmp;
