define([], function() {
  return {
    "PropertyPaneDescription": "Description",
    "Intro": "In the List Settings you need to click on each column and look in the adress bar in your browser to find their unique names (the names they got when they where created). Looks like this for ex &Field=Start_x0020_Date. Take the name after =, so Start_x0020_Date is the column name you should enter below. When you have entered everything you have to save and then reload the page to see the results. If the calendar is empty, there is probably an error in the column names. The max amount of items in a list this webpart supports is 1000. Large lists will take some time to load. Hyperlink and lookup columns are not supported. Recurring events are not supported, as they cant be fetched and fullcalendar can't handle them",
    "ListNameFieldLabel": "List Name",
    "defaultViewFieldLabel":"Default view to use (month,agendaWeek,basicWeek,agendaDay,listMonth)",
    "defaultWeekendLabel":"Show weekends. Check to show weekends",
    "titleEventLabel":"Column name for title of the event. Use a calculated column to add different columns together. Title shows up in the calendar",
    "startDateLabel":"Column name for starting date. Has to be a date column",
    "endDateLabel":"Column name for end date. Has to be a date column",
    "descriptionLabel":"Column name for description. This description is shown when a event is clicked in the details, use a calculated column to show multiple columns for ex =CONCATENATE([Column1]', '[Column2]')",
    "optionalLabelName":"Column label name you can decide yourself. Leave it empty for the label to not show up",
    "optionalLabel":"Column name for this column. To leave it empty type ServerRedirectedEmbedUrl below (and make the label empty above). ServerRedirectedEmbedUrl is in all sharepoint list and is most of the time empty. Otherwise create an empty column that is not used",
    "eventColorLabel":"Column with color names. Column should be choice or text, names of color should be css color names or hex (for example red,blue,green,yellow). To not use the default color for all events, type ServerRedirectedEmbedUrl below. Use a calculated column to automatically set the color depending on another column for ex =IF(typeofdelivery='D1','red','blue')",
    "siteNameLabel":"Enter the site url where the list is present, for example https://swecogroup.sharepoint.com/sites/mysite (no slash in the end). You can use any site the user has access to, so for example the webpart might be in a sub-site but the list in a root site",
    "filterQueryLabel":"Advanced. Enter a filter to the REST API query that filters what entries are retrieved. This way you can get calendar items that match a certain criteria, for example a choice column with the options Important/Not important you can filter out important meeting. A filter looks like ( typeofdelivery eq 'D1' ) (&$filter= is already inserted before), no quotes except '' around text in filters. This option doesn't check anything and passes anything along, so be careful. Filters also doesn't work on all types of columns, for example calculated is not supported. Read more about filter here and Google https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx#Filtering_items"
  }
});