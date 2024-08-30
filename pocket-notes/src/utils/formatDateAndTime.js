const formatDateTime = (date) => {
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Intl.DateTimeFormat('en-GB', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-GB', optionsTime).format(date);
    return { date: formattedDate, time: formattedTime };
  };

export default formatDateTime