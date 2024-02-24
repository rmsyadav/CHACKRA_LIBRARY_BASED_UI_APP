import { Box, Badge, Image, AspectRatio } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const MovieCard = (props: any) => {
	return (
		<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
			<AspectRatio maxW="400px" ratio={4 / 3}>
				<Image src={props.item?.Poster
} alt={props.item?.imageAlt} />
			</AspectRatio>
			<Box p="3">
				<Box display="flex" alignItems="baseline">
					<Badge borderRadius="full" px="2" colorScheme="teal">
						New
					</Badge>
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					>
						{props.item?.beds} beds &bull; {props.item?.baths} baths
					</Box>
				</Box>

				<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
					{props.item?.Title}
				</Box>

				<Box>
					{props.item?.formattedPrice}
					<Box as="span" color="gray.600" fontSize="sm">
						/ wk
					</Box>
				</Box>

				<Box display="flex" mt="2" alignItems="center" justifyContent="space-between">
					<Box display="flex">
						{Array(5)
							.fill('')
							.map((_, i) => (
								<StarIcon key={i} color={i < props.item?.rating ? 'teal.500' : 'gray.300'} />
							))}
						<Box as="span" ml="2" color="gray.600" fontSize="sm">
							{props.item?.reviewCount} reviews
						</Box>
					</Box>

					<Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8}>
						Buy Now
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default MovieCard;