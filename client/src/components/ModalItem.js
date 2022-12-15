const ModalItem = ({ item, index }) => {
    return (
      <div style={styles.item__container}>
        <div>Pos: {index + 1}</div>
        <div style={styles.center}>
          Name: {item.user}, Score: {item.score}
        </div>
  
        <img style={styles.img} src={item.userImg} alt='user' />
      </div>
    );
  };
  
  const styles = {
    item__container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 55,
      width: "80%",
      border: "2px solid #FCBC5C",
      borderRadius: 30,
      marginBottom: 4,
      padding: 10,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    center: { display: "flex", justifyContent: "center" },
    img: {
      height: "100%",
  
      border: "2px solid #FCBC5C",
      borderRadius: 50,
    },
  };
  
  export default ModalItem;