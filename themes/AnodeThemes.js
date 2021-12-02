
const AndroidTheme = {
  dimensions: {
    chart: {
      yAxisMarginLeft: 10,
      xAxisMarginTop: 8,
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: 'Arial, Helvetica, sans'
    },
    alertBanner: {
      width: 'auto',
      borderRadius: 30,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    listItem: {
      paddingVertical: 16,
      paddingHorizontal: 0,
      marginHorizontal: 0,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderRadius: 0
    },
    listSectionHeader: {
      paddingVertical: 16,
      paddingHorizontal: 0,
      fontWeight: 'bold',
      textTransform: 'none'
    },
    tabs: {
      tabMarginHorizontal: 20
    },
    modal: {
      borderRadius: 12,
      titleSeparatorWidth: 1,
      titleFontWeight: "500",
      titleFontSize: 24,
      titleTextAlign: 'center'
    },
    bodyText: {
      paragraphPaddingTop: 16,
      paragraphPaddingBottom: 16,
      betweenParagraphPadding: 8,
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 1.3,
      textAlign: 'center',
      width: '100%',
      // FIXME: add fonts: https://stackoverflow.com/a/52916277/5671180
      // fontFamily: 'Archivo-Black'
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      // FIXME: add fonts: https://stackoverflow.com/a/52916277/5671180
      // fontFamily: 'KeepCalm-Medium'
    },
    button: {
      borderRadius: 50,
      textAlign: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      width: '100%',
      textTransform: 'none',
      fontWeight: 'normal',
      borderWidth: 1
    },
    link: {
      fontWeight: 'normal',
      textTransform: 'none',
      textAlign: 'center',
      textDecorationLine: 'underline'
    },
    screen: {
      paddingHorizontal: 20,
      paddingVertical: 16
    },
    inputs: {
      borderWidth: 1,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      paddingVertical: 16,
      borderRadius: 7,
      width: '100%',
      supportingTextPaddingTop: 10,
      supportingTextPaddingHorizontal: 0,
      labelPaddingBottom: 8
    },
    accountBalance: {
      fontSize: 30,
      fontWeight: 'bold',
      textTransform: 'none'
    },
    addressCard: {
      fontFamily: 'monospace',
      lineHeight: 1.6,
      fontSize: 20,
      textAlign: 'left',
      borderRadius: 8,
      width: 230
    },
    transactionCard: {
      fontFamily: 'monospace',
      lineHeight: 1.6,
      fontSize: 20,
      textAlign: 'left',
      borderRadius: 3,
      width: 200
    },
    headers: {
      vertical: 41,
      horizontal: 11,
      headerHeight: 105
    },
    screens: {
      topPadding: 11,
      bottomPadding: 32,
      horizontal: 20
    },
    smallButton: {
      borderRadius: 8
    },
    tabs:{
      height:82,
      tabWidth:125,
      topPadding:6,
      bottomPadding:34,
    },
    paddingHorizontal: 20,
    paddingVertical: 16,
    horizontalSpacingBetweenItems: 10,
    verticalSpacingBetweenItems: 8,
    horizontalSpacingBetweenItemsShort: 5,
    verticalSpacingBetweenItemsShort: 4,
    shortPadding: 12
  }
}

export const AnodeLightTheme = {
  dark: false,
  colors: {
    chart: {
      axisTextColor: '#1F1F1F'
    },
    alertBanner: {
      successBackgroundColor: '#1f9145',
      warningBackgroundColor: '#F6C79F',
      dangerBackgroundColor: '#C15B5C',
      infoBackgroundContainer: '#F1F2F6',
      color: '#fff',
      boxShadow: '2px 2px 10px #e7e8ec, -2px -2px 10px #fbfcff'
    },
    screen: {
      backgroundColor: '#F1F2F6',
      color: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    listItem: {
      borderColor: '#E6E6E6'
    },
    listSectionHeader: {
      backgroundColor: 'transparent',
      color: '#000'
    },
    modal: {
      overlayBackgroundColor: 'rgba(0, 0, 0, 0.2)',
      backgroundColor: '#F1F2F6',
      titleSeparatorColor: '#A9A9A9'
    },
    bodyText: {
      color: '#1F1F1F'
    },
    headerText: {
      color: '#1F1F1F'
    },
    inputs: {
      color: '#000',
      borderColor: '#A9A9A9',
      backgroundColor: 'transparent',
      borderTopColor: '#A9A9A9',
      borderLeftColor: '#A9A9A9',
      borderRightColor: '#A9A9A9',
      borderBottomColor: '#A9A9A9',
      borderErrorColor: '#A50000',
      borderTopErrorColor: 'transparent',
      borderLeftErrorColor: 'transparent',
      borderRightErrorColor: 'transparent',
      borderBottomErrorColor: '#A50000',
      placeholderTextColor: '#A9A9A9',
      helpTextColor: '#A9A9A9',
      errorTextColor: '#A50000',
      labelColor: '#000'
    },
    primaryButton: {
      backgroundColor: '#2978A8',
      color: '#fff',
      borderColor: '#2978A8'
    },
    secondaryButton: {
      backgroundColor: '#2978A8',
      color: '#fff',
      borderColor: '#2978A8'
    },
    unselectedButton: {
      backgroundColor: 'transparent',
      color: '#A9A9A9',
      borderColor: '#A9A9A9'
    },
    disabledButton: {
      backgroundColor: 'transparent',
      color: '#A9A9A9',
      borderColor: '#A9A9A9'
    },
    dangerButton: {
      backgroundColor: '#C15B5C',
      color: '#2B398F',
      borderColor: '#C15B5C'
    },
    link: {
      color: '#2B398F'
    },
    slider: {
      borderColor: '#A9A9A9'
    },
    logo: {
      primaryColor: '#2B398F',
      secondaryColor: '#4AA6C4'
    },
    addressCard: {
      backgroundColor: '#fff'
    },
    transactionCard: {
      backgroundColor: '#fff'
    },
    transactionListItem: {
      confirmedIconColor: '#37B761',
      unconfirmedIconColor: '#ED1111',
      pendingIconColor:'#D9B455'
    },
    recoveryWord: {
      backgroundColor: '#192140',
      borderRadius: 8
    },
    smallButton: {
      backgroundColor: '#192140',
    },
    background: '#F1F2F6',
    borderColor: '#F1F2F6',
    text: '#000',
    disabledText: '#A9A9A9',
    securityBackground: '#2E4292'
  },
  dimensions: AndroidTheme.dimensions
}

export const AnodeDarkTheme = {
  dark: true,
  colors: {
    chart: {
      axisTextColor: '#fff'
    },
    alertBanner: {
      successBackgroundColor: '#1f9145',
      warningBackgroundColor: '#FF8319',
      dangerBackgroundColor: '#A50000',
      infoBackgroundContainer: '#121212',
      color: '#fff',
      boxShadow: '2px 2px 10px #06151e, -2px -2px 10px #103347'
    },
    screen: {
      backgroundColor: '#141528',
      color: '#fff'
    },
    listItem: {
      borderColor: '#566670'
    },
    listSectionHeader: {
      backgroundColor: 'transparent',
      color: '#fff'
    },
    modal: {
      overlayBackgroundColor: 'rgba(0, 0, 0, 0.6)',
      backgroundColor: '#222531',
      titleSeparatorColor: '#A9A9A9'
    },
    bodyText: {
      color: '#fff'
    },
    headerText: {
      color: '#8EBED6'
    },
    inputs: {
      color: '#fff',
      borderColor: '#323A44',
      backgroundColor: 'transparent',
      borderTopColor: '#323A44',
      borderLeftColor: '#323A44',
      borderRightColor: '#323A44',
      borderBottomColor: '#323A44',
      borderErrorColor: '#A50000',
      borderTopErrorColor: 'transparent',
      borderLeftErrorColor: 'transparent',
      borderRightErrorColor: 'transparent',
      borderBottomErrorColor: '#A50000',
      placeholderTextColor: '#A9A9A9',
      helpTextColor: '#A9A9A9',
      errorTextColor: '#ED1111',
      labelColor: '#fff'
    },
    primaryButton: {
      backgroundColor: '#4BA7C4',
      color: '#fff',
      borderColor: '#4BA7C4'
    },
    secondaryButton: {
      backgroundColor: '#2E4292',
      color: '#fff',
      borderColor: '#2E4292'
    },
    unselectedButton: {
      backgroundColor: 'transparent',
      color: '#A9A9A9',
      borderColor: '#A9A9A9'
    },
    disabledButton: {
      backgroundColor: 'transparent',
      color: '#A9A9A9',
      borderColor: '#A9A9A9'
    },
    dangerButton: {
      backgroundColor: '#A50000',
      color: '#fff',
      borderColor: '#A50000'
    },
    link: {
      color: '#2773A1'
    },
    slider: {
      borderColor: '#A9A9A9'
    },
    logo: {
      primaryColor: '#4BA7C4',
      secondaryColor: '#EAF7FA'
    },
    addressCard: {
      backgroundColor: '#fff'
    },
    transactionCard: {
      backgroundColor: '#fff'
    },
    transactionListItem: {
      confirmedIconColor: '#37B761',
      unconfirmedIconColor: '#ED1111',
      pendingIconColor:'#D9B455'
    },
    recoveryWord: {
      backgroundColor: '#192140',
      borderRadius: 8
    },
    smallButton: {
      backgroundColor: '#192140',
    },
    background: '#141528',
    borderColor: '#141528',
    text: '#fff',
    disabledText: '#A9A9A9',
    securityBackground: '#141528'
  },
  dimensions: AndroidTheme.dimensions
}
