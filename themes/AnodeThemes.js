
const AndroidTheme = {
  dimensions: {
    chart: {
      yAxisMarginLeft: '10px',
      xAxisMarginTop: '8px',
      fontWeight: 'normal',
      fontSize: '0.8em',
      fontFamily: 'Arial, Helvetica, sans'
    },
    alertBanner: {
      width: 'auto',
      borderRadius: '30px',
      marginHorizontal: '20px',
      textAlign: 'center'
    },
    listItem: {
      paddingVertical: '16px',
      paddingHorizontal: '0px',
      marginHorizontal: '0px',
      borderTopWidth: '0px',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
      borderBottomWidth: '1px',
      borderRadius: '0px'
    },
    listSectionHeader: {
      paddingVertical: '16px',
      paddingHorizontal: '0px',
      fontWeight: 'bold',
      textTransform: 'none'
    },
    tabs: {
      tabMarginHorizontal: '20px'
    },
    modal: {
      borderRadius: '30px',
      titleSeparatorWidth: '1px',
      titleFontWeight: 'bold',
      titleFontSize: 'normal',
      titleTextAlign: 'center'
    },
    bodyText: {
      paragraphPaddingTop: '16px',
      paragraphPaddingBottom: '16px',
      betweenParagraphPadding: '8px',
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: '1.3',
      textAlign: 'center',
      width: '100%',
      fontFamily: 'Archivo-Black'
    },
    headerText: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      textAlign: 'left',
      fontFamily: 'KeepCalm-Medium'
    },
    button: {
      borderRadius: '50px',
      textAlign: 'center',
      paddingHorizontal: '20px',
      paddingVertical: '16px',
      width: '100%',
      textTransform: 'none',
      fontWeight: 'normal',
      borderWidth: '1px'
    },
    link: {
      fontWeight: 'normal',
      textTransform: 'none',
      textAlign: 'center',
      textDecorationLine: 'underline'
    },
    screen: {
      paddingHorizontal: '20px',
      paddingVertical: '16px'
    },
    inputs: {
      borderWidth: '1px',
      borderTopWidth: '0px',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
      borderBottomWidth: '1px',
      paddingHorizontal: '0px',
      paddingVertical: '16px',
      borderRadius: '3px',
      width: '100%',
      supportingTextPaddingTop: '10px',
      supportingTextPaddingHorizontal: '0px',
      labelPaddingBottom: '8px'
    },
    accountBalance: {
      fontSize: '1.20em',
      fontWeight: 'bold',
      textTranform: 'none'
    },
    addressCard: {
      fontFamily: 'monospace',
      lineHeight: '1.6',
      fontSize: '1.2em',
      textAlign: 'left',
      borderRadius: '3px',
      width: '200px'
    },
    transactionCard: {
      fontFamily: 'monospace',
      lineHeight: '1.6',
      fontSize: '1.2em',
      textAlign: 'left',
      borderRadius: '3px',
      width: '200px'
    },
    paddingHorizontal: '20px',
    paddingVertical: '16px',
    horizontalSpacingBetweenItems: '10px',
    verticalSpacingBetweenItems: '8px',
    horizontalSpacingBetweenItemsShort: '5px',
    verticalSpacingBetweenItemsShort: '4px'
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
      paddingVertical: '20px',
      paddingHorizontal: '20px'
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
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
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
      color: '#E5EFF4',
      borderColor: '#2978A8'
    },
    secondaryButton: {
      backgroundColor: '#2978A8',
      color: '#E5EFF4',
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
      confirmedIconColor: '#1f9145',
      unconfirmedIconColor: '#F6C79F'
    },
    recoveryWord:{
      backgroundColor:'#192140',
      borderRadius:8
    },
    background: '#F1F2F6',
    border: '#F1F2F6',
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
      backgroundColor: '#121212',
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
      backgroundColor: '#121212',
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
      borderColor: '#A9A9A9',
      backgroundColor: 'transparent',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#A9A9A9',
      borderErrorColor: '#A50000',
      borderTopErrorColor: 'transparent',
      borderLeftErrorColor: 'transparent',
      borderRightErrorColor: 'transparent',
      borderBottomErrorColor: '#A50000',
      placeholderTextColor: '#A9A9A9',
      helpTextColor: '#A9A9A9',
      errorTextColor: '#A50000',
      labelColor: '#fff'
    },
    primaryButton: {
      backgroundColor: '#4BA7C4',
      color: '#D4D7E9',
      borderColor: '#4BA7C4'
    },
    secondaryButton: {
      backgroundColor: '#2E4292',
      color: '#D4D7E9',
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
      confirmedIconColor: '#1f9145',
      unconfirmedIconColor: '#FF8319'
    },
    recoveryWord:{
      backgroundColor:'#192140',
      borderRadius:8
    },
    background: '#121212',
    border: '#121212',
    text: '#fff',
    disabledText: '#A9A9A9',
    securityBackground: '#121212'
  },
  dimensions: AndroidTheme.dimensions
}
