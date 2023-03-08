function Favorite() {
    const [favorites, setFavorites] = useState([]);

    return (
        <Box>
            <Typography variant="h4" component="h2">
                Favoris
            </Typography>
            {favorites.map(favorite => (
                <Box key={favorite.id}>
                    <Link to={`/event/${favorite.id}`}>
                        <Typography variant="h5" component="h3">
                            {favorite.title}
                        </Typography>
                    </Link>
                    <Typography variant="body1">{favorite.description}</Typography>
                    <Typography variant="body2">{moment(favorite.date).format('MMMM Do YYYY, h:mm a')}</Typography>
                </Box>
            ))}
        </Box>
    );
}
