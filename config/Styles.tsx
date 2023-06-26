import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  // Global Values

  flexContainer: {
    flex: 1,
  },
  xlText: {
    color: '#1D1A20',
    fontSize: 24,
    fontFamily: 'GeneralSans-Bold',
  },
  xxlText: {
    paddingHorizontal: '8%',
    color: '#1D1A20',
    fontSize: 34,
    fontFamily: 'GeneralSans-Bold',
  },
  
  //Home Screen
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '4%',
  },
  postContainer: {
    flex: 2,
    display: 'flex',
    height: '100%',
  },
  topSection: {
    paddingHorizontal: '8%',
    paddingTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  avatarList: {
    marginLeft: '5%',
    marginTop: '6%',
    flexDirection: 'row',
    display: 'flex',
    paddingBottom: '10%',
  },
  avatarImages: {
    borderRadius: 50,
    marginHorizontal: 5,
    height: 68,
    width: 68,
  },
  //Post Items
  postUserNameText: {
    fontWeight: '600',
    color: '#1D1A20',
  },
  postTopContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
  },
  postHeaderTextContainer: {
    flexDirection: 'column',
    paddingTop: 12,
    paddingLeft: 6,
  },
  postCreateText: {
    color: '#1D1A20',
    marginLeft: 5,
  },
  postText: {
    marginHorizontal: '8%',
    marginVertical: '2%',
  },
  postBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    marginBottom: '10%',
  },
  postCreateTimeText: {
    paddingTop: 6,
    color: 'lightgray',
  },
  postIconContainer: {
    position: 'absolute',
    right: 0,
  },
  postIconStyle: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  postTextInnerContainer: {
    flexDirection: 'row',
  },
  //Edit User Screen / Bottom Sheet Panel
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelButtonContainer: {
    alignItems: 'center',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 7,
    justifyContent: 'center',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    paddingTop: '12%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: 'white',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: 15,
  },
  userTitle: {
    fontFamily: 'GeneralSans-Medium',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  inputsContainer: {
    paddingHorizontal: '4%',
    paddingTop: '10%',
    zIndex: -4,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#333333',
  },
  //User Screen
  userContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '20%',
  },
  userImg: {
    height: 125,
    width: 125,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  userAbout: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: 'black',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  userPostContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 4,
    width: '90%',
    gap: 8,
    paddingBottom: '22%',
  },
  userPostImages: {
    height: 100,
    width: 100,
  },
  // Sign In - Sign Up Screen
  authHeaderTextContainer: {
    alignSelf: 'center',
    paddingTop: '40%',
  },
  authHeaderText: {
    color: '#1D1A20',
    textAlign: 'center',
    fontFamily: 'GeneralSans-Medium',
    fontSize: 35,
  },
  authSubText: {
    color: 'gray',
    textAlign: 'center',
  },
  authTextInput: {
    marginTop: '4%',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: 50,
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    paddingLeft: 15,
    paddingRight: '15%',
    color: '#1D1A20',
  },
  authInputContainer: {
    paddingTop: '20%',
  },
  authInputIcon: {
    position: 'absolute',
    paddingRight: '13%',
    alignSelf: 'flex-end',
    zIndex: 1,
    bottom: 15,
  },
  authButtonContainer: {
    alignSelf: 'center',
    marginTop: '10%',
  },
  authButtonStyle: {
    width: width * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#1D1A20',
  },
  authButtonText: {
    fontFamily: 'GeneralSans-Medium',
    color: 'white',
  },
  signUpText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
  authNewMemberContainer: {
    paddingTop: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 12,
  },

  //Add Screen
  addTakePhoto:{
    backgroundColor: 'white',
    borderRadius: 50,
    width: 80,
    height: 80,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 40,
    borderColor: 'lightgrey',
    borderWidth: 6,
  },
  addPickImage:{
    borderRadius: 10,
    width: 45,
    height: 45,
    left: '5%',
    position: 'absolute',
    bottom: 40,
    borderColor: 'lightgrey',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFlashIcon:{
    borderRadius: 10,
    width: 45,
    height: 45,
    right: '5%',
    position: 'absolute',
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCameraChange:{
    borderRadius: 10,
    width: 45,
    height: 45,
    left: '5%',
    position: 'absolute',
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingTop: '15%',
  },
  addInputContainer: {
    flexDirection: 'row',
    margin:'5%'
  },
  addText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'GeneralSans-Medium',
  },
  addAvatar: {
    borderRadius: 24,
    height: 48,
    width: 48,
    marginRight: 16,
  },
  addIconContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addPhotoIcon: {
    alignItems: 'flex-end',
    margin: '2%',
  },
  addInputStyle: {
    color: 'black',
    marginLeft:'2%',
    width:'70%',
  },
  addEditButton:{
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 50,
    right: '5%',
    backgroundColor: 'white',
    width: 90,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
  },
  addEditButtonText:{
    color: 'black',
    textAlign: 'center',
    fontFamily: 'GeneralSans-Bold',
  },
  //Explore 
  
  exploreSearchInput: {
    marginTop:'4%',
    borderRadius:20,
    alignSelf:'center',
    justifyContent:'center',
    width:width*.85,
    height:50,
    backgroundColor:'#DADADA',
    paddingLeft:35
  },
  exploreSearchIcon:{
    position:'absolute',
    paddingLeft:'10%',
    zIndex:1,
    bottom:15,
  }
});
