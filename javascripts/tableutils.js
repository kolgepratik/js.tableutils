/*
* jquery.tableUtils
*
* Copyright (c) 2013 Kolge Pratik
*
* Licensed under MIT
* http://www.opensource.org/licenses/mit-license.php
* 
* http://docs.jquery.com/Plugins/Authoring
* jQuery authoring guidelines
*
* Launch  : Febraury 2013 
* Version : 1.0
*/


/*
* The plug-in supports multiple tables on a single page. 
*/

(
	function( $ ) {
		
		var settings = {
			
			// Holds the settings for all the tables being operated on. 
			tableSettings: [],

			// Temporary variable. 
			tableID: '',
			
			// Holds the information about all the columns on a table. 
			columns: [],
			
			// Options for fixing header. 
			fixHeaderOptions: { 
					required: true, 
					height: 200, 
					width: 600,					
					messages: [], 
					nextMessageIndex: 0,
					messageLoop: {},
					messageLoopInterval: 2000 
				},
				
			// Options for user controls. 
			buttons: {
					required: false
				},
				
			// Options for rowselect. 
			rowSelectOptions: {
					required: false,
					message: { type: 'rowSelect', message: '' }
				},
			
			// Options for filter table. 
			filterTableOptions: {
					required: false,
					customFilterType: false, 
					type: 'text', 
					activeFilters: [],
					message: { type: 'filterTable', message: '' }
				},
			
			// Options for mastercheckbox. 
			masterCheckBoxOptions: {
					required: false,
					columnNumber: 1,
					message: { type: 'masterCheckBox', message: '' }
				},
			
			// Options for sorting. 
			sortOptions: {
					required: false,
					customSortType: false, 
					type: 'alphanumeric', 
					sortingState: {},
					message: { type: 'sorting', message: '' }
				},
			
			// Options for pagination. 
			paginationOptions: { 
					availablePageSizes: [5, 10, 20, 50, 100], 
					currentPage: 1, 
					displayPagesCount: 5, 
					numberOfPageLinks: -1, 
					pageSize: 10,
					type: 'numeric', 
					serverSide: false, 
					columnIndex: -1,
					pageMappings: [ 
						'-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
						'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 
						'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', 
						'3', '4', '5', '6', '7', '8', '9' 
					],
					message: { type: 'pagination', message: '' }					
				},
			
			// Options for new record insertion.
			newRowOptions: {
					message: { type: 'newRecord', message: '' }
				},
				
			// Options for record deletion. 
			deleteRecordsOptions: {
					message: { type: 'deleteRecords', message: '' }
				}, 
			
			// Options for record editing. 
			editRecordOptions: {
					message: { type: 'editRecord', message: '' }
				},
			
			// Holds the context root of the application. 
			contextRoot: '',
			
			// The resources directory that holds the resources required for this plug-in. 
			resourcesDir: '', 
			
			// Page Size. 
			pageSize: 5,
			
			// Column number of the mastercheckBox column. 
			masterCheckBoxIndex: -1,
			
			// Holds the number of links present. 
			numberOfPageLinks: 1,
			
			// How many pages to display at once. 
			displayPagesCount: 5,
			
			// The current page number. 
			currentPage: 1, 
			
			// Is pagination required ? 
			paginationRequired: false,
			
			// Fix the header ? 
			fixedHeaderTable: '',
			
			// Height of the table. 
			height: 300,
			
			// Width of the table ( and of the corresponding containers. ). 
			globalWidth: -1,
			
			newRowOptions: {},
			
			// Update URL. 
			updateURL: '',
			
			newRow: {},
			
			// The available page sizes. 
			availablePageSizes: [5, 10, 20, 50, 100]
		};
		
		/**
		* This variable holds all methods supported by this plugin. 
		*/
		var methods = {
			
			/**
			* Initializes the options and sets up some basic things. 
			*/
			init: function(options) {
				//console.log('Init function.');
				
				if($(this) != null) {
				
					// Table's ID. 
					var tableID = $(this).attr('id');							
					
					// Get the Settings. 
					$.extend(settings, options);
					
					// Get the Context Root of the Application. 
					settings.contextRoot = methods.getContextRoot();
					
					// Get fix header options. 
					if(options.fixHeader) {
						if(options.fixHeader === true) {
							$.extend(settings.fixHeaderOptions, { required: true });
						} else {
							$.extend(settings.fixHeaderOptions, { required: true }, options.fixHeader);
						}					
					}
					
					// Add user controls. 
					if(options.buttons) {
						if(options.buttons === true) {
							$.extend(settings.buttons, { required: true });
						} else {
							$.extend(settings.buttons, { required: true }, options.buttons);
						}	
					}
					
					// Get rowselect options. 
					if(options.rowSelect) {
						if(options.rowSelect === true) {
							$.extend(settings.rowSelectOptions, { required: true });
						} else {
							$.extend(settings.rowSelectOptions, { required: true }, options.rowSelect);
						}
					}	
					
					// Get filter options. 
					if(options.filter) {
						if(options.filter === true) {
							$.extend(settings.filterTableOptions, { required: true });
						} else {
							$.extend(settings.filterTableOptions, { required: true }, options.filter);
						}
					}							
					
					// Get sorting options. 
					if(options.sort) {	
						if(options.sort === true) {
							$.extend(settings.sortOptions, { required: true });
						} else {
							$.extend(settings.sortOptions, { required: true }, options.sort);
						}	
					}
					
					// Get pagination options. 
					if(options.paginate) {	
						if(options.paginate === true) {
							$.extend(settings.paginationOptions, { required: true });
						} else {
							$.extend(settings.paginationOptions, { required: true }, options.paginate);
						}
					}
					
					// Get mastercheckBox options. 
					if(options.masterCheckBox) {
						if(options.masterCheckBox === true) { 
							$.extend(settings.masterCheckBoxOptions, { required: true });
						} else {
							$.extend(settings.masterCheckBoxOptions, { required: true }, options.masterCheckBox);
						}
						
					}
					
					// Get new record options. 
					if(options.newRow) {	
						if(options.newRow === true) {
							$.extend(settings.newRowOptions, { required: true });
						} else {
							$.extend(settings.newRowOptions, { required: true }, options.newRow);
						}
					}
					
					// Get delete records options. 
					if(options.deleteRecords) {	
						if(options.deleteRecords === true) {
							$.extend(settings.deleteRecordsOptions, { required: true });
						} else {
							$.extend(settings.deleteRecordsOptions, { required: true }, options.deleteRecords);
						}
					}
					
					// Get edit record options. 
					if(options.editRow) {
						if(options.editRow === true) {
							$.extend(settings.editRecordOptions, { required: true });
						} else {
							$.extend(settings.editRecordOptions, { required: true }, options.editRow);
						}	
					}

					// Save settings for this table.  
					saveTableSettings(tableID);
					
					// Load settings for this table.  
					loadTableSettings(tableID);
					
					// Fix the header. 
					if(options.fixHeader) {
						methods.fixHeader(tableID);
					}
					
					// Add user controls. 
					if(options.buttons) {
						methods.addButtons(tableID);
					}
					
					// Row select. 
					if(options.rowSelect) {
						methods.rowSelect(tableID);
					}
					
					// Sorting. 
					if(options.sort) {
						methods.sort(tableID);
					}
					
					// Filtering. 
					if(options.filter) {
						methods.filterTable(tableID);					
					}
					
					// Mastercheckbox. 
					if(options.masterCheckBox) {
						methods.masterCheckBox(tableID);
					}
					
					// Pagination. 
					if(options.paginate) {
						methods.paginate(tableID);
					}
					
					// New Record. 
					if(options.newRow) {
						methods.newRecordInsertion(tableID);
					}
					
					// Edit Record. 
					if(options.editRow) {
						methods.editRecord(tableID);
					}
					
					// Delete Record. 
					if(options.deleteRecords) {
						methods.deleteRecords(tableID);
					}
					
					// Clean Up. 
					methods.finalSteps(tableID);
				}
				
			},
			
			
			/**
			* Perform final cleanup steps. 
			*/ 
			finalSteps: function(tableID) {
				var $mainTable = $('#' + tableID);
				
				$mainTable.on('hideTable', function() {
					$('#outermostDiv_' + tableID).hide();
				});
				
				$mainTable.on('showTable', function() {
					$('#outermostDiv_' + tableID).show();
				});
				
				applyTableStyling(tableID);
			},
			
			
			/**
			 * Returns the Context Root for the Application. 
			 */
			getContextRoot: function() {
				//console.log('Getting the context root.');	
				
				// Get the URL. 
				var url = window.location.href;
				
				// Identify the Context Root from the URL. 
				var exp = new RegExp('(http://)[0-9a-zA-Z\.\:]*\/[0-9a-zA-Z\.]*\/');
				
				// Extract the Context Root from the URL. 
				var matches = exp.exec(url);
				
				if(matches == null) {
					exp = new RegExp('(https://)[0-9a-zA-Z\.\:]*\/[0-9a-zA-Z\.]*\/');
					matches = exp.exec(url);
				} 
				
				// Get the 1st match. 
				var root = matches[0];
				
				// Return the Root. 
				return root.substring(0, root.length - 1); 
			}, 
			
			
			/**
			 * Fixes the header for the table. 
			 * 
			 * DOM structure after fixing the header. 
			 * 
			 * +--- Actual Container of the table 
			 *    +
			 *    +--- Main Container 
			 *       +
			 *       +--- Messages and Controls Area Container 
			 *       +
			 *       +--- Main Table Container (Relatively Positioned, Overflow: Hidden.)
			 *       +   +   
			 *       +   +--- Header Table Container (Absolutely Positioned, Overflow: None.)
			 *       +   +
			 *       +   +--- Body Table Container (Absolutely Positioned, Overflow: Auto.)
			 *       +
			 *       +--- Pagination Controls and Info Container (Optional. Added when paginating the table.). 
			 * 
			 * Options: 
			 *    - height: The Height of the table (in pixels). 
			 *    - width: The Width of the table (in pixels). 
			 */			
			fixHeader: function(tableID) {
				//console.log('Fixing header for: ' + tableID);	
				
				// Load table settings. 
				loadTableSettings(tableID);
				
				// This is the ID of the Table that contains the Fixed Header. 
				settings.fixHeaderOptions.fixedHeaderTable = 'fixedHeader_' + tableID;
				
				// Clone the current table. 
				var $this = $('#' + tableID).clone();
				
				// The Main Container DIV. 
				var $outerMostDiv = $('<div></div>').attr('id', 'outermostDiv_' + tableID).addClass('tableUtils_mainContainer');
				
				// The Main table container DIV. 
				var $innerDiv = $('<div style="height: ' + settings.fixHeaderOptions.height + 'px; width: ' + settings.fixHeaderOptions.width + 'px;"></div>').attr('id', 'outerDiv_' + tableID).addClass('outer');
				
				// The Header table container DIV. 
				var $fixHeaderDiv = $('<div id="fixedTableWrapper_' + tableID + '"></div>').addClass('header');
				
				// The Main table container DIV. 
				var $mainTableDiv = $('<div id="mainTableWrapper_' + tableID + '"></div>').addClass('body');
								
				// The fixed header table. 
				var $clonedTable = $this.clone().attr('id', settings.fixHeaderOptions.fixedHeaderTable);
				
				// Width of the table, that will be used by its containers. 
				settings.fixHeaderOptions.tableWidth = settings.fixHeaderOptions.width;
				
				// Apply Styling to the table if not already present. 								
				$this.addClass('tableUtils_table');
				$clonedTable.addClass('tableUtils_table');					 
				
				// Apply the same width to the fixed header table. 
				//$clonedTable.width($this.width() + 'px');
				
				// Append the Fixed header table to the Header Container DIV and the Main table to the Body Container DIV. 
				$fixHeaderDiv.append($clonedTable);				
				$mainTableDiv.append($this);
				
				// Remove the Head Section from the Main table and Body Section from the Cloned Table. 
				$this.find('thead').remove();
				$clonedTable.find('tbody').remove();				
				
				// Append the fix header and body containers to the Main Table Container DIV. 
				$innerDiv.append($fixHeaderDiv);
				$innerDiv.append($mainTableDiv);
				
				// Append the main table container to the Main Container DIV. 
				$outerMostDiv.append($innerDiv);
				
								
				// The General Info and Additional Controls DIV (Same width as the main table's width.).
				var $generalInfoDiv = $('<div></div>').attr('id', 'generalInfo_' + tableID).addClass('tableUtils_generalInfoDiv').width(settings.fixHeaderOptions.width);
				
				// The table that will hold the controls and the messages. 
				var $generalInfoTable = $('<table style="width: 100%;"></table>').attr('id', 'generalInfoTable_' + tableID);
				
				// User controls. 
				var $userControlsContent = $('<td></td>').attr('id', 'userControls_' + tableID).addClass('tableUtils_userControls');
				
				// The additional controls area. 
				var $additionalControlsContent = $('<td></td>').attr('id', 'additionalControls_' + tableID).addClass('tableUtils_controls');
				
				// The messages area. 
				var $messageContent = $('<td></td>').attr('id', 'generalMessage_' + tableID).addClass('tableUtils_messages').hide();				
				
				// Append the areas to the General Info Container table and append the table to the Container DIV. 
				$generalInfoTable.append('<tr></tr>');
				$generalInfoTable.find('tr').append($userControlsContent);
				$generalInfoTable.find('tr').append($additionalControlsContent);
				$generalInfoTable.find('tr').append($messageContent);				
				$generalInfoDiv.append($generalInfoTable);			

				// Prepend the General Info and Additional Controls DIV to the Main Container DIV. 
				$outerMostDiv.prepend($generalInfoDiv);
				
				
				// This is the ID of the Cell that contains the Messages. 
				settings.fixHeaderOptions.messagesArea = 'generalMessage_' + tableID;
				
				
				// Hide the Messages area if messages are disabled. 
				if(settings.disableMessages === true) {
					$generalInfoDiv.hide();
				} else {				
					// Create the messages loop. 
					settings.fixHeaderOptions.messageLoop = setInterval( function() {
							updateMessages(tableID);
						}, settings.fixHeaderOptions.messageLoopInterval );
				}
				
				
				// Replace the main table with the Main Container DIV. 
				$('#' + tableID).replaceWith($outerMostDiv);
				

				// Horizontally scroll the Header DIV alongwith the BODY DIV. 
				$mainTableDiv.scroll(function (e) {				  
					$fixHeaderDiv.css({
						left: -$mainTableDiv[0].scrollLeft + 'px'
					});
				});


				// Create a handler for the event when the main table's header is updated (i.e. when the Header table's DOM is manipulated.). This is just to adjust the 'top' property of the Main Table Container DIV. 								
				$this.on('tableHeaderUpdated', function() {
					// The table's ID. 
					var tableID = $this.attr('id');
					
					// Load table settings. 
					loadTableSettings(tableID);
					
					// Adjust the position (top) and height of the Main Table Container. 
					var fixHeaderWrapperHeight = $('#' + settings.fixHeaderOptions.fixedHeaderTable).height();
					$('#mainTableWrapper_' + tableID).css('top', fixHeaderWrapperHeight + 'px').height((settings.fixHeaderOptions.height - fixHeaderWrapperHeight - 5) + 'px');
					
					//console.log('Table Header was Updated.');
				});
				
				
				// Create a handler for the event when the main table itself is updated (i.e. is when the table is emptied and new rows are added.). 
				$this.on('tableUpdated', function() {
					// The table object. 
					var $this = $(this);
					
					// The table's ID. 
					var tableID = $this.attr('id');
										
					//console.log('Updating table: ' + tableID);
					
					// Load table settings. 
					loadTableSettings(tableID);
					
					// Rowselect. 
					if(settings.rowSelectOptions.required === true) {
						//console.log('Updating rowSelect');
						methods.rowSelect(tableID);
					}
					
					// Do nothing on sort for now. Might be needed in the future. 
					if(settings.sortOptions.required === true) {
						; 
					}
					
					// Filter table. 
					if(settings.filterTableOptions.required === true) {
						//console.log('Updating filter');
						$this.find('tbody tr').addClass('filteredRow');
					}
					
					// Mastercheckbox. 
					if(settings.masterCheckBoxOptions.required === true) {
						//console.log('Updating mastercheckbox');
						
						// The table object. 
						var $this = $(this);
						
						// Get the Children checkboxes. 
						var $childCheckBoxes = $this.find('tbody tr td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ') input:checkbox');
				
						// Add 'change' event handler to the checkbox in each row of the table.
						$childCheckBoxes.each(function() {						
							// Add the 'change' handler to the checkbox. 
							$(this).on('change', function() {
								if($(this).is(':checked')) {
									$(this).closest('tr').addClass('tableUtils_selectedRow');
								} else {
									$(this).closest('tr').removeClass('tableUtils_selectedRow');
								}								
								childCheckBoxToggledHandler(tableID);						
							});					
						});
					}
					
					// Pagination. 
					if(settings.paginationOptions.required === true) {
						//console.log('Updating pagination');
						
						$this.find('tbody tr').addClass('currentPageRow');
					}
				});
				
				
				// Create a handler for the event when the main table itself is updated (i.e. is when the table is emptied and new rows are added.). 
				$this.on('freeze', function() {				
					var tableID = $(this).attr('id');
					
					loadTableSettings(tableID);
					
					$('#' + settings.fixHeaderOptions.fixedHeaderTable).attr('disabled', true);
					$('#' + tableID).attr('disabled', true);
					//$('#generalInfo_' + tableID).attr('disabled', true);
					
					if(settings.paginationOptions.required === true) {
						$('paginationDiv_' + tableID).attr('disabled', true);
					} 
				});
				
				
				// Create a handler for the event when the main table itself is updated (i.e. is when the table is emptied and new rows are added.). 
				$this.on('unFreeze', function() {
					var tableID = $(this).attr('id');
					
					loadTableSettings(tableID);
					
					$('#' + settings.fixHeaderOptions.fixedHeaderTable).attr('disabled', false);
					$('#' + tableID).attr('disabled', false); 
					//$('#generalInfo_' + tableID).attr('disabled', false);
					
					if(settings.paginationOptions.required === true) {
						$('paginationDiv_' + tableID).attr('disabled', false);
					} 
				});
				
				
				// Trigger 'tableHeaderUpdated' event to update the Body Container's position. 
				$this.trigger('tableHeaderUpdated');
				
				// Save table settings. 
				saveTableSettings(tableID); 
				
			},
			
			
			/*
			* Add user controls to the table. 
			*/
			addButtons: function(tableID) {
				//console.log('Adding user controls for: ' + tableID);	
				
				// Load table settings. 
				loadTableSettings(tableID);
				
				var $userControlsArea = $('#userControls_' + tableID);
				
				// Add each button to the additional controls area. 
				$.each(settings.buttons, function(index, userButton) {
					if(userButton.id) {
						// Create a new button. 
						var $newButton = $('<button type="button"></button>').attr('id', userButton.id);

						// If the user wants custom class, then let him have it. 
						if(userButton.buttonClass) {
							$newButton.addClass(userButton.buttonClass);
						} else {
							// Else style the button according to the plugin. 
							$newButton.addClass('tableUtils_imageButton');
						}
						
						// If styling is required. 
						if(userButton.style) {
							$newButton.css(userButton.style);
						}
						
						// If the user wants to display text on the button, then assign the text. 
						if(userButton.text) {
							$newButton.html(userButton.text);
						} else {
							// Else if the user has given icon path, use the icon. 
							if(userButton.icon) {
								$newButton.append($('<img>').attr('src', settings.contextRoot + userButton.icon));
							} else {
								// Else use the default icon. 
								$newButton.append($('<img>').attr('src', settings.contextRoot + settings.resourcesDir + '/edit1.png'));
							}
						}
						
						// Show tooltip if any. 
						if(userButton.tooltip) {
							$newButton.attr('title', userButton.tooltip);
						} 
						
						// Attach the 'click' event handler for the button. 
						$newButton.on('click', userButton.callBack); 	

						// Append the button to the user controls area. 
						$userControlsArea.append($newButton);						
					}
				});				
			},
			
			
			/**
			 * Generate filters for the table. 
			 * 
			 * Options: 
			 *    - type.			 
					Description: The type of filter for each column. 
			 *      
					Datatype: Array. 
					
					Possible values: 
					   - text.
						 Description: Simple Text filter. 
						 
					     Datatype: String. 
						 
					   - dateFilter.
						 Description: Date Filter (uses jQuery UI's DatePicker Widget.). 
						 
					     Datatype: String / Object.
						 If the Datatype is an Object, the whole Object is passed as a parameter to the jQuery UI's DatePicker widget. 
						 
					   - select.
					     Description: Use a Drop-down list as a filter.
						 
						 Datatype: Object. 
						 Properties: 
							- type.
							  Description: Value of type property should be 'select'.
							  
							  Datatype: String.
							  
							- options: []
							  
			 *    - width: The Width of the table (in pixels). 
			 * 
			 * 
			 */	
			filterTable: function(tableID) {
				//console.log('Filtering for: ' + tableID);	
				
				// Load table settings. 
				loadTableSettings(tableID);
				
				// The table object. 
				var $mainTable = $('#' + tableID);
				
				// The header table object. 
				var $headerTable = $('#' + settings.fixHeaderOptions.fixedHeaderTable);
				
				// The list of table headers. 
				var $headers = $headerTable.find('thead tr th');
				
				// If the filtering option 'type' is specified, then generate custom filters. 
				if($.isArray(settings.filterTableOptions.type)) {
					// Generate custom filters. 
					settings.filterTableOptions.customFilterType = true;
					
					// Get all the types of filters for each column. 
					var columnTypes = settings.filterTableOptions.type;
					
					// Generate the filters for columns. 
					$headers.each(function(index) {	
						// The Filter Element that will be added to the header column. 
						var $filterElement = $('');	
						
						// If the option for this column is an Object 
						if($.isPlainObject(columnTypes[index])) { 
							// If its a 'select' filter (Drop-down) 
							if(columnTypes[index].type === 'select') { 
								// Filter element is a Drop-down list. Add an empty option to the filter. 
								$filterElement = $('<select style="width: 100%;">').attr('id', 'filter_' + tableID + '_' + index).addClass('tableUtils_selectFilter');
								$filterElement.append($('<option>', {
									text: '',
									value: ''
								})); 
								
								// The array that will hold the options for the filter. 
								var selectOptions = new Array();

								// If 'generateOptions' i.e. if we should generate values for the filter from the table data 
								if(columnTypes[index].options.generateOptions) {
									// Holds data from each row for the current header/column. 
									var $allValuesForColumn = $mainTable.find('tbody tr td:nth-child(' + (index + 1) + ')');
																								
									// For each column data, add the value to the filter Drop-down if it is not already present. 
									$allValuesForColumn.each(function(index) {
										// The column data. 
										var columnValue = $.trim($(this).text());
										
										// Remove value from the Drop-down options if already present. 
										selectOptions = $.grep(selectOptions, function(optionObject, index) {
											return ( optionObject.value === columnValue );
										}, true)
										
										// Add the new value to the Drop-down options. 
										selectOptions.push({
											name: columnValue,
											value: columnValue
										});
									});
									
									var optionsSortFunction = null;
									if(columnTypes[index].filterType === 'numeric') {
										optionsSortFunction = function(obj1, obj2) {
											return (obj1.value - obj2.value);
										};
									} else {
										optionsSortFunction = function(obj1, obj2) {
											return ((obj1.value === obj2.value) ? 0 : (obj1.value > obj2.value ? 1 : -1));
										};
									}
									
									selectOptions.sort(optionsSortFunction);
									
								} else {								
									// Else, add the values specified in the 'selectOptions' property to the Drop-down list. 
									selectOptions = columnTypes[index].options.selectOptions;									
								}
								
								
								// Add each filter value to the Drop-down filter. 
								$.each(selectOptions, function(index, option) {
									$filterElement.append($('<option>', {
										text: option.name,
										value: option.value
									}));
								});
									
									
								// Bind 'change' event handler to the Drop-down filter. 
								$filterElement.on('change', function() {
									var filterValue = $(this).find('option:selected').val();									
									updateFilter(tableID, index, filterValue, columnTypes[index].filterType);									
								});
							} else if(columnTypes[index].type === 'dateFilter') {	
								// Else if its a 'Date' filter, create a text-box for the filter. 							
								$filterElement = $('<input type="text" style="width: 100%;">').attr('id', 'filter_' + tableID + '_' + index).addClass('tableUtils_dateFilter');
																
								// Bind 'keyup' event handler to the filter. 
								$filterElement.on('keyup', function() {
									updateFilter(tableID, index, $(this).val(), 'dateFilter');
								});
								
								// We use the jQuery Ui's DatePicker. Configure the DatePicker. 
								var opts = { onSelect: function(dateText) {									
									updateFilter(tableID, index, dateText, 'dateFilter');
								}};
								
								// If the user has supplied his own options for the DatePicker, use them. 
								$.extend(opts, columnTypes[index].options);		
								
								// Initialize the DatePicker. 
								$filterElement.datepicker(opts);								
							}
						} else {
							// Else if the filter is not specified by an Object 
							if(columnTypes[index] === 'noFilter') {
								// Do not perform filtering on this column. 
								;
							} else if(columnTypes[index] === 'text') {
								// It's a simple text filter. Create a text-box for this filter. 
								$filterElement = $('<input type="text" style="width: 100%;">').attr('id', 'filter_' + tableID + '_' + index).addClass('tableUtils_textFilter');
								
								// Bind 'keyup' event handler to the filter. 
								$filterElement.on('keyup', function() {
									updateFilter(tableID, index, $(this).val(), 'text');
								});
							} else if(columnTypes[index] === 'checkbox') {
								// It's a checkbox filter. Create a checkbox for this filter. 
								$filterElement = $('<input type="checkbox">').attr('id', 'filter_' + tableID + '_' + index).addClass('tableUtils_checkboxFilter');
								
								// Bind 'change' event handler to the filter. 
								$filterElement.on('change', function() {
									updateFilter(tableID, index, $filterElement.is(':checked'), 'checkbox');
								});
							} else if(columnTypes[index] === 'dateFilter') {
								// Else if its a 'Date' filter, create a text-box for the filter. 
								$filterElement = $('<input type="text" style="width: 100%;">').attr('id', 'filter_' + tableID + '_' + index).addClass('tableUtils_dateFilter');
								
								// Bind 'keyup' event handler to the filter. 
								$filterElement.on('keyup', function() {
									updateFilter(tableID, index, $(this).val(), 'dateFilter');
								});
								
								// We use the jQuery Ui's DatePicker. Configure the DatePicker. 
								var opts = { onSelect: function(dateText) {									
									updateFilter(tableID, index, dateText, 'dateFilter');
								}};
								
								// Initialize the DatePicker. 
								$filterElement.datepicker(opts);								
							}
						}
						
						// Append the '$filterElement' which contains a filter for the current header. 
						$(this).append($('<br>').add($filterElement));						
					});
				} else {
					/* If not type is specified, then we assume its a text filter for each header. */
				
					// The Filter Element that will be added to the header column. 
					var $filterElement = $('');
					
					// For each header 
					$headers.each(function(index) {						
						// Create a text-box for the filter. 
						$filterElement = $('<br><input type="text" style="width: 100%;">').attr('id', 'filter_' + tableID + '_' + index).addClass('tableUtils_textFilter');	
						
						// Bind 'keyup' event handler to the filter. 						
						$filterElement.on('keyup', function() {
							updateFilter(tableID, index, $(this).val(), 'text');
						});
						
						// Append the '$filterElement' which contains a filter for the current header. 
						$(this).append($filterElement);					
					});
				}
				
				// Initially, add 'filteredRow' class to each row of the table. Each row that matches the active filters will have a 'filteredRow' class. 
				// The same class gets removed from the unmatched rows. 
				$mainTable.find('tbody tr').addClass('filteredRow');
				
				// Now, since we have added new elements to the header table, its height has changed. 
				// So we trigger the 'tableHeaderUpdated' event for this table, which updates the position of the Main Table Container DIV. 
				$mainTable.trigger('tableHeaderUpdated');
				
				// Save table settigns. 
				saveTableSettings(tableID);					
			}, 
			
			
			/**
			 * Create a mastercheckBox for the table. 
			 *
			 * Options: 
			 *    - columnIndex: The column in which the mastercheckbox should be added. 
			 *
			 */
			masterCheckBox: function(tableID) {
				//console.log('Mastercheckbox for: ' + tableID);
				
				// Load table settigns. 
				loadTableSettings(tableID);					
				
				// The table object. 
				var $mainTable = $('#' + tableID);
				
				// The header table object. 
				var $headerTable = $('#' + settings.fixHeaderOptions.fixedHeaderTable);
				
				// The column where we want to add the mastercheckBox. 
				var masterCheckBoxColumnNumber = settings.masterCheckBoxOptions.columnNumber;
				
				// The header where the mastercheckBox will be appended. 
				var $masterCheckBoxCell = $headerTable.find('thead tr th:nth-child(' + masterCheckBoxColumnNumber + ')').empty();				
				
				// This is the ID of the mastercheckBox.  
				settings.masterCheckBoxOptions.masterCheckBox = 'masterCheckBox_' + tableID;
				
				// Generate a jQuery Selector for selecting the eligible table rows from the main table. 
				var eligibleRowsSelector = 'tbody tr';
				if(settings.filterTableOptions.required === true) {
					eligibleRowsSelector += '.filteredRow';
				}
				
				if(settings.paginationOptions.required === true) {
					eligibleRowsSelector += '.currentPageRow';
				}
				
				settings.masterCheckBoxOptions.eligibleRowsSelector = eligibleRowsSelector;
				
				// The mastercheckBox. 
				var $masterCheckBox = $('<input type="checkbox">').attr('id', settings.masterCheckBoxOptions.masterCheckBox).addClass('tableUtils_masterCheckBoxCell');

				// Bind 'change' event handler to the mastercheckBox. 
				$masterCheckBox.on('change', function() {
					toggleChildrenCheckBoxes(tableID, $(this).is(':checked'));
				});				
				
				// Append the mastercheckBox to the mastercheckBox header. 
				$masterCheckBoxCell.append($masterCheckBox);				
				
				// Get the checkboxes in this column from all the rows of the table. 
				var $childCheckBoxes = $mainTable.find('tbody tr td:nth-child(' + masterCheckBoxColumnNumber + ') input:checkbox');
				
				// Bind the 'change' event to each of these checkboxes. 
				$childCheckBoxes.each(function() {
					$(this).on('change', function() {
						if($(this).is(':checked')) {
							$(this).closest('tr').addClass('tableUtils_selectedRow');
						} else {
							$(this).closest('tr').removeClass('tableUtils_selectedRow');
						}
						childCheckBoxToggledHandler(tableID);						
					});					
				});
				

				if(settings.paginationOptions.required === true) {
				
					/* Additional Controls allow a feature to provide additional controls for improving its effectiveness. */
					
					// Get the additional controls area for the table. 
					var $additionalControlsArea = $('#additionalControls_' + tableID);
					
					// We will put the additional controls for the mastercheckBox(as well as the additional controls for other features.) in a SPAN (since we want it inline.). 
					var $masterCheckBoxAdditionalControls = $('<span></span>').attr('id', 'masterCBAdditionalControls_' + tableID).hide();
					
					// Create and append the control for selecting all rows in the table to the mastercheckBox additional controls area. 
					var $selectAllItemsControl = $('<span></span>').attr('id', 'selectAllItemsControl_' + tableID);
					$selectAllItemsControl.append($('<a href="#">Select All Records</a>'));
					$selectAllItemsControl.on('click', function() {
							selectAllItems(tableID);
						});				
					$masterCheckBoxAdditionalControls.append($selectAllItemsControl);
					
					// Create and append the control for de-selecting all rows in the table to the masterCheckBox additional controls area. 
					var $deSelectAllItemsControl = $('<span></span>').attr('id', 'deSelectAllItemsControl_' + tableID);
					$deSelectAllItemsControl.append($('<a href="#">Clear Selection</a>'));
					$deSelectAllItemsControl.on('click', function() {
							deSelectAllItems(tableID);
						});				
					$masterCheckBoxAdditionalControls.append($deSelectAllItemsControl);
					
					// Append the mastercheckBox controls to the additional controls area. 
					$additionalControlsArea.append($masterCheckBoxAdditionalControls);
					
					// Bind 'showControls' event to the mastercheckBox. 
					$masterCheckBox.on('showControls', function() {
						$('#masterCBAdditionalControls_' + tableID).show();
						$('#selectAllItemsControl_' + tableID).show();
						$('#deSelectAllItemsControl_' + tableID).hide();				
					});
					
					// Bind 'hideControls' event to the mastercheckBox. 
					$masterCheckBox.on('hideControls', function() {									
						$('#selectAllItemsControl_' + tableID).hide();
						$('#deSelectAllItemsControl_' + tableID).hide();						
						$('#masterCBAdditionalControls_' + tableID).hide();
					});
				}
				
				// Save table settings. 
				saveTableSettings(tableID);	
			}, 
						
			
			/**
			 * Make the table columns sortable.  
			 *
			 * Options: 
			 *    - type 
					Description: The type of sorting to be applied on each column. 
					
					Datatype: Array 
			 *
			 */
			sort: function(tableID) {
			
				//console.log('Sorting for: ' + tableID);	
			
				// Load table settigns. 
				loadTableSettings(tableID);
				
				// The table object. 
				var $mainTable = $('#' + tableID);
				
				// The header table object. 
				var $headerTable = $('#' + settings.fixHeaderOptions.fixedHeaderTable);
				
				// The headers in the header table. 
				var $headers = $headerTable.find('thead tr th');
				
				// The context root of the Application. 
				var cntxRoot = settings.contextRoot; 			
				
				// Generate a jQuery Selector for selecting the eligible table rows from the main table. 
				var eligibleRowsSelector = 'tbody tr';
				if(settings.filterTableOptions.required === true) {
					eligibleRowsSelector += '.filteredRow';
				}
				
				settings.sortOptions.eligibleRowsSelector = eligibleRowsSelector;
				
				// If the 'type' option is an Array 
				if($.isArray(settings.sortOptions.type)) {
					// We have custom sorting on the table headers. 
					settings.sortOptions.customSortType = true;
					
					// Holds the sorting type for each header of the table. 
					var sortTypes = settings.sortOptions.type;
					
					// For each header 
					$headers.each(function(index) {	
						// Holds the current header. 
						var $this = $(this);
						
						// The content of the header (the text in the header column.).
						var headerName = $.trim($this.text());
						
						// The sorting link to be added to this header. 
						var $sortElement = $('<a href="#">' + headerName + '</a>').attr('id', 'sort_' + tableID + '_'+ index).addClass('tableUtils_sortLink');						
						
						// Bind 'click' event handler to the sorting link for this header depending on its sort type. 
						if(sortTypes[index] === 'noSort') {
							$sortElement = $('');
						} else if(sortTypes[index] === 'numeric') {							
							$sortElement.on('click', function() {
								updateSortInfo(tableID, index, 'numeric');
							});
						} else if(sortTypes[index] === 'float') {
							$sortElement.on('click', function() {
								updateSortInfo(tableID, index, 'float');
							});
						} else if(sortTypes[index] === 'alphanumeric') {
							$sortElement.on('click', function() {
								updateSortInfo(tableID, index, 'alphanumeric');
							});								
						}						
						
						// Remove any existing content from the header column and append the sorting link to the header column. 
						$this.empty().append($sortElement);
					});
				} else {
					/* If the 'type' option is not an array, we assume alphanumeric sorting on each header. */
					
					// The sorting link to be added to the header. 
					var $sortElement = $('');
					
					// For each header 
					$headers.each(function(index) {
						// Holds the current header. 
						var $this = $(this);
						
						// The content of the header (the text in the header column.).
						var headerName = $.trim($this.text());
						
						// Create the sorting link. 
						$sortElement = $('<a href="#">' + headerName + '</a>').attr('id', 'sort_' + tableID + '_'+ index).addClass('tableUtils_sortLink');						
						
						// Bind 'click' event handler to the sorting link for this header. 
						$sortElement.on('click', function() {
							updateSortInfo(tableID, index, 'alphanumeric');
						});
						
						// Remove any existing content from the header column and append the sorting link to the header column. 
						$this.empty().append($sortElement);
					});					
				}				
				
				// Now, since we have added new elements to the header table, its height has changed. 
				// So we trigger the 'tableHeaderUpdated' event for this table, which updates the position of the Main Table Container DIV.  
				$mainTable.trigger('tableHeaderUpdated');
				
				// Save table settings. 
				saveTableSettings(tableID);	
			}, 
			
			
			/**
			 * Make the table rows as rowSelectors.  
			 *
			 * Options: 
			 *    - columnIndex: The column in which the checkbox that selects a row is present. 
			 *
			 */
			rowSelect: function(tableID) {
				
				//console.log('RowSelect for: ' + tableID);	
				
				// Load table settigns. 
				loadTableSettings(tableID);
				
				// The table object. 
				var $mainTable = $('#' + tableID);
				
				// All rows in the table. 
				var $tableRows = $mainTable.find('tbody tr');
				
				// The index of the column in which the selector checkbox is present. 
				var checkBoxColumn = settings.rowSelectOptions.columnIndex;
				
				// For each row 
				$tableRows.each(function(index) {
					// The current row. 
					var $this = $(this);
					
					// Add 'tableUtils_rowSelect' class to the row. 
					$this.addClass('tableUtils_rowSelect');
					
					// The checkbox in the checkbox column of this row. 
					var $checkboxInThisRow = $this.find('td:nth-child(' +  checkBoxColumn + ') input:checkbox');					
					
					// The row columns excluding the one in which the selector checkbox is present. 
					var $rowColumns = $this.find('td').not(':nth-child(' + checkBoxColumn + ')');					
					
					// For each of these columns 
					$rowColumns.each(function(index) {	
						// The current column. 
						var $this = $(this);
						
						// Bind the 'click' event handler to this column, so that it will select or de-select the row when it is clicked. 
						$this.on('click', function() {
							// The TD that was clicked. 
							var $this = $(this);
							
							// The main table's ID. 
							var mainTableID = $this.closest('table').attr('id');
							
							// Load table settigns. 
							loadTableSettings(mainTableID);
							
							// The index of the column in which the selector checkbox is present. 
							var checkBoxColumnIndex = settings.rowSelectOptions.columnIndex;
							
							// The checkbox in the checkbox column of this row. 
							var $checkboxInThisRow = $this.closest('tr').find('td:nth-child(' +  checkBoxColumnIndex + ') input:checkbox');	
							
							// Toggle the value of the checkbox. 
							$checkboxInThisRow.attr('checked', !$checkboxInThisRow.attr('checked'));
							
							// Trigger the checkbox's 'change' event. 
							$checkboxInThisRow.trigger('change');															
						});						
					});
				});
			},			
			
			
			/**
			 * Paginate the table.  
			 *
			 * Options: 
			 *    - columnIndex: The column in which the checkbox that selects a row is present. 
			 *
			 */
			paginate: function(tableID) {				
				// Load table settings. 
				loadTableSettings(tableID);				
				
				// Eligigble rows for pagination. 
				var eligibleRowsSelector = 'tbody tr';
				if(settings.filterTableOptions.required === true) {
					eligibleRowsSelector += '.filteredRow';
				}				
				settings.paginationOptions.eligibleRowsSelector = eligibleRowsSelector;				
				
				var $paginationDiv = $('<div class="tableUtils_paginationDiv">').attr('id', 'paginationDiv_' + tableID).width(settings.fixHeaderOptions.width);
				
				var $paginationContentTable = $('<table class="tableUtils_paginationContentTable">').attr('id', 'paginationContentTable_' + tableID);
				
				var $paginationStats = $('<td>').attr('id', 'paginationStats_' + tableID);
				
				var $paginationLinks = $('<td>').attr('id', 'paginationLinks_' + tableID);
								
				$paginationStats.append('Page: ').append($('<span></span>').attr('id', 'currentPageInfo_' + tableID));
				$paginationStats.append('&nbsp;&nbsp;Page Size: ').append($('<span></span>').attr('id', 'pageSizeInfo_' + tableID));
				$paginationStats.append('&nbsp;&nbsp;Records: ').append($('<span></span>').attr('id', 'recordsOnThisPageInfo_' + tableID).hide());
				$paginationStats.append('&nbsp;&nbsp;Total Records: ').append($('<span></span>').attr('id', 'totalRecordsInfo_' + tableID));
									
				$paginationContentTable.append($('<tr>').append($paginationLinks));
				
				$paginationContentTable.append($('<tr>').append($paginationStats));
				
				$paginationDiv.append($paginationContentTable);
				
				$('#outermostDiv_' + tableID).append($paginationDiv);
								
				//$('#' + searchTableID + '_paginationInformationDiv').append('<table width="100%"><tr><td><br></td></tr><tr><td width="70%" align="left" valign="top" id="' + searchTableID + '_paginationStats"></td><td width="30%" valign="top" align="right" id="' + searchTableID + '_paginationLinks"></td></tr></table>').css({width: settings.globalWidth + 'px'});
				
				//console.log('settings.pageSize: ' + settings.pageSize);				
				if($.inArray(settings.paginationOptions.pageSize, settings.paginationOptions.availablePageSizes) == -1) {
					settings.paginationOptions.availablePageSizes.push(settings.paginationOptions.pageSize);
					//console.log('appended page size');
				}
				
				settings.paginationOptions.availablePageSizes.sort(function(pageSize1, pageSize2) {
					return (pageSize1 > pageSize2) ? 1 : ((pageSize1 < pageSize2) ? -1 : 0);
				});
				
				//console.log('page sizes length: ' + settings.availablePageSizes.length);
				var $pageSizeSelectContent = $('<span class="tableUtils_label">&nbsp;&nbsp;Page Size: </span>');
				
				var $pageSizeSelect = $('<select></select>').attr('id', 'pageSizeSelect_' + tableID);
				$pageSizeSelect.on('change', function() {
					updatePageSize(tableID);
				});
				
				$.each(settings.paginationOptions.availablePageSizes, function(index, pageSize) {
					//console.log('adding page size: ' + this);
					$pageSizeSelect.append($('<option>', {
						text: pageSize, value: pageSize
					}));
				});
				
				$pageSizeSelect.val(settings.paginationOptions.pageSize);
				
				if(settings.paginationOptions.type !== 'numeric') {
					$pageSizeSelectContent.hide();
					$pageSizeSelect.hide();		
					
					$('#pageSizeInfo_' + tableID).hide();
					$('#recordsOnThisPageInfo_' + tableID).show();				
				}
				
				$paginationStats.append($pageSizeSelectContent, $pageSizeSelect);
				
				//
				
				var $gotoPage = $('<span class="tableUtils_label">&nbsp;&nbsp;Go to Page: </span>');
				
				var $pageSelect = $('<select></select>').attr('id', 'pageSelect_' + tableID);
				$pageSelect.on('change', function() {
					goToPage(tableID, $(this).attr('value'));
				});
				
				$paginationStats.append($gotoPage, $pageSelect); 
				
				//
				
				
				
				//$('#' + searchTableID + '_pageSizeSelect').val(settings.pageSize);
				
				$paginationStats.append($('<span class="tableUtils_label">').attr('id', 'pageItemsInfo_' + tableID)); 
				
				saveTableSettings(tableID);
				
				resetToFirstPage(tableID);
			}, 
			
			
			/**
			* Indepenedent method. This method will return the selected records on the current page. 
			*/
			getSelectedRecordsOnPage: function(columnIndex) {
				var tableID = this.attr('id');
				
				loadTableSettings(tableID);
				var $mainTable = $('#' + tableID);				
				var eligibleRowsSelector = settings.masterCheckBoxOptions.eligibleRowsSelector;
				var $rows = $mainTable.find(eligibleRowsSelector);
				var selectionColumn = (!columnIndex) ? settings.masterCheckBoxOptions.columnNumber : columnIndex;
				var selection = new Array();
				
				var $selectedRecords = $rows.find('td:nth-child(' + selectionColumn + ') input:checkbox:checked');
				$selectedRecords.each(function(index) {
					selection.push($(this).val());
				});
				
				return selection;
			},
			
			
			/**
			* Indepenedent method. This method will return all the records on current page. 
			*/
			getAllRecordsOnPage: function(columnIndex) {
				var tableID = this.attr('id');
				
				loadTableSettings(tableID);
				var $mainTable = $('#' + tableID);				
				var eligibleRowsSelector = settings.masterCheckBoxOptions.eligibleRowsSelector;
				var $rows = $mainTable.find(eligibleRowsSelector);
				var selectionColumn = (!columnIndex) ? settings.masterCheckBoxOptions.columnNumber : columnIndex;
				var selection = new Array();
				
				var $selectedRecords = $rows.find('td:nth-child(' + selectionColumn + ') input:checkbox');
				$selectedRecords.each(function(index) {
					selection.push($(this).val());
				});
				
				return selection;
			},
			
			
			/**
			* Indepenedent method. This method will return the current pagination information. 
			*/
			getCurrentPageInfo: function() {
				var tableID = this.attr('id');
				
				loadTableSettings(tableID);
				
				var currentPageInfo = {				
					pageSize: settings.paginationOptions.pageSize,				
					currentPage: settings.paginationOptions.currentPage, 
					start: settings.paginationOptions.start,
					end: settings.paginationOptions.end,
					sortingDetails: settings.sortOptions.sortingState,	 				
					filteringDetails: settings.filterTableOptions.activeFilters,
					type: settings.paginationOptions.type,
					columnIndex: settings.paginationOptions.columnIndex
				};				
				
				return currentPageInfo;
			},

			
			/**
			* Add a new message to the table. 
			*/ 
			addMessage: function(message) {
				var $this = this;
				
				var tableID = $this.attr('id');
				
				loadTableSettings(tableID);
				
				//console.log('pushing message: ' + message.type);			
				settings.fixHeaderOptions.messages = $.grep(settings.fixHeaderOptions.messages, function(msg, msgIndex) {
					return (msg.type === message.type);
				}, true);
				
				settings.fixHeaderOptions.messages.push(message);
				
				saveTableSettings(tableID);
				
				setNextMessage(tableID, message);
				
				clearMessagesInterval(tableID);
				
				updateMessages(tableID);
			},
			
			
			/**
			* Add a new message to the table. 
			*/ 
			removeMessage: function(message) {
				var $this = this;
				
				var tableID = $this.attr('id');
				
				loadTableSettings(tableID);
				
				settings.fixHeaderOptions.messages = $.grep(settings.fixHeaderOptions.messages, function(msg, msgIndex) {
					return (msg.type === message.type);
				}, true);
				
				settings.fixHeaderOptions.nextMessageIndex = 0;
				
				saveTableSettings(tableID);
				
				clearMessagesInterval(tableID);
				
				updateMessages(tableID);
			},
			
			
			/*
			pushMessage = function(tableID, message) {
				loadTableSettings(tableID);
				
				//console.log('pushing message: ' + message.type);			
				settings.fixHeaderOptions.messages = $.grep(settings.fixHeaderOptions.messages, function(msg, msgIndex) {
					return (msg.type === message.type);
				}, true);
				
				settings.fixHeaderOptions.messages.push(message);
				
				saveTableSettings(tableID);
				
				setNextMessage(tableID, message);
				
				clearMessagesInterval(tableID);
				
				updateMessages(tableID);
				
			}; 
			
			
			popMessage = function(tableID, message) {
				loadTableSettings(tableID);
				
				settings.fixHeaderOptions.messages = $.grep(settings.fixHeaderOptions.messages, function(msg, msgIndex) {
					return (msg.type === message.type);
				}, true);
				
				settings.fixHeaderOptions.nextMessageIndex = 0;
				
				saveTableSettings(tableID);
				
				clearMessagesInterval(tableID);
				
				updateMessages(tableID);
			}; 
			*/
			
			/**
			 * Adds a new row to the selected table. 
			 */
			addRow: function(options) {
                if(options.tableID) {
					var $insertIn = $('#' + options.tableID);
				
					var $row;
					
					if(options.row) {
						// If a new row is to be added, then add a new row; else use existing row.
						if(options.row.props) {                  
							$row = $('<tr></tr>');
							$.each(options.row.props, function(name, value) {
								//console.log('Property: ' + name);
								if(name === 'style') {
									$($row).css(value);
								} else {
									$($row).attr(name, value);
								}
							});
						} else {
							$row = options.row;
						} 
					} else {
						$row = $('<tr></tr>');
					}
					
					// Add each column to the row.
					$.each(options.columns, function(index, value) {    
						// Create a new column.
						var $newCell = $('<td></td>');
						
						// If we need to assign properties to the column, assign the properties; else simply add the html.
						if(value.props) { 
							$.each(value.props, function(name, value) {
								if(name === 'style') {
									$($newCell).css(value);
								} else {
									$($newCell).attr(name, value);
								}
							});
							$($newCell).html(value.html);
						} else {
							$($newCell).html(value);
						}
						
						// Append the column to the row.
						$($row).append($($newCell));
					});
										
					$insertIn.append($row); 
					
					$insertIn.find('tbody tr:odd').addClass('bgLtRow');
					$insertIn.find('tbody tr:even').addClass('bgDkRow');
					
				}
            },
			
			
			
			deleteRecords: function(tableID) {
				//console.log('Adding delete functionality.');
				
				var $mainTable = $('#' + tableID);
				
				loadTableSettings(tableID);	

				if(settings.masterCheckBoxOptions.required === true) {
				
					$mainTable.on('deleteRecords', function() {
						var tableID = $(this).attr('id');
						
						var selector = 'tbody tr';
						if(settings.filterTableOptions.required === true) {
							selector += '.filteredRow';
						}
						
						var $selectedRows = $mainTable.find(selector).find('td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ')').find('input:checkbox:checked'); 
						var totalSelectedRecords = $selectedRows.length;
						
						var selectedRecords = new Array();
						$selectedRows.each(function(index, record) {
							selectedRecords.push( { name: 'recordsToDelete', value: $(record).val()} );
						});
						
						if(totalSelectedRecords > 0) {			
							$.ajax({
								url: settings.deleteRecordsOptions.deleteURL, 
								
								data: selectedRecords,
								
								beforeSend: function() { return true; },
								
								success: function(data) {
									$selectedRows.each(function(index, record) {
										$(record).parent().parent().remove();
									});
									
									if(settings.paginationOptions.required === true) {
										resetToFirstPage(tableID);
									} 
									
									alert(totalSelectedRecords + ' Record(s) Deleted.');
								},
								
								error: function(msg) { alert('The following error occurred while Deleting the Selected Records: ' + msg.statusText); },
								
								dataType: 'json',
								
								cache: false
							});
						} else {
							alert('Please Select Atleast 1 Record.'); 
						}
						
					});
					
					var $deleteRecordsButtonsDiv = $('<span></span>').attr('id', 'deleteRecordsAdditionalControls_' + tableID);
					
					var $deleteButton = $('<button type="button"></button>').attr('id', 'deleteRecordButton_' + tableID).addClass('tableUtils_imageButton');
					$deleteButton.append($('<img title="Delete" alt="Delete">').attr('src', settings.contextRoot + settings.resourcesDir + '/rmv2.png').addClass('tableUtils_imageButton'));
					
					$deleteButton.on('click', function() {
						$mainTable.trigger('deleteRecords');					
					});
									
					$deleteRecordsButtonsDiv.append($deleteButton);
					
					$('#additionalControls_' + tableID).append($deleteRecordsButtonsDiv); 
					
				} 
			},
			
			
			
			editRecord: function(tableID) {
				//console.log('Adding edit functionality.');
				
				var $mainTable = $('#' + tableID);
				
				loadTableSettings(tableID);					
				
				var $editRowButtonsDiv = $('<span></span>').attr('id', 'editRowAdditionalControls_' + tableID);
				
				var $editButton = $('<button type="button"></button>').attr('id', 'editRowAddButton_' + tableID).addClass('tableUtils_imageButton');
				var $saveEditButton = $('<button type="button"></button>').attr('id', 'editRowSaveButton_' + tableID).addClass('tableUtils_imageButton').hide();
				var $cancelEditButton = $('<button type="button"></button>').attr('id', 'editRowCancelButton_' + tableID).addClass('tableUtils_imageButton').hide();
				
				$editButton.append($('<img alt="Edit" title="Edit">').attr('src', settings.contextRoot + settings.resourcesDir + '/edit1.png').addClass('tableUtils_imageButton'));
				$saveEditButton.append($('<img alt="Save Edited Record" title="Save">').attr('src', settings.contextRoot + settings.resourcesDir + '/ok1.png').addClass('tableUtils_imageButton'));
				$cancelEditButton.append($('<img alt="Cancel" title="Cancel">').attr('src', settings.contextRoot + settings.resourcesDir + '/no3.png').addClass('tableUtils_imageButton'));
				
				$editButton.on('click', function() {
					$mainTable.trigger('startEditRow');
				});
				
				$saveEditButton.on('click', function() {
					$mainTable.trigger('endEditRow');
				});
				
				$cancelEditButton.on('click', function() {
					$mainTable.trigger('cancelEditRow');					
				});
				
				$editRowButtonsDiv.append($editButton);
				$editRowButtonsDiv.append($saveEditButton);
				$editRowButtonsDiv.append($cancelEditButton);
				
				$('#additionalControls_' + tableID).append($editRowButtonsDiv); 
								
				var newColumns = [];
				
				//console.log('Editing row.');
				
				$.each(settings.columns, function(index, column) {
					var $newCell = $('<span></span>');
					
					var $inputElement = null;
					if(column.type === 'text' || column.type === 'label') {
						$inputElement = $('<input>');
						$inputElement.attr('type', 'text');							
					} else if(column.type === 'select') {
						$inputElement = $('<select></select>');
						//$inputElement.attr('type', 'text');
						
						$.each(column.options, function(index, option) {
							$inputElement.append('<option>', {text: option.text, value: option.value});
						});
					}											
					
					$inputElement.attr('id', column.name);
					$inputElement.attr('title', 'Enter ' + column.label);
					
					$inputElement.css('width', '100%');					
					
					//if(column.disabled) {
						//$inputElement.attr('disabled', true);
					//}
					
					$inputElement.addClass('editRowField');
					
					$newCell.append($inputElement);
					
					if(column.editable === false) {
						$inputElement.hide();
						$newCell.append('<label></label>'); 
					}
					
					//console.log('New Cell to be added: ' + $newCell.html());
					
					var newColumn = null;
					
					var columnData = $newCell.html();
					
					if(column.style) {
						newColumn = new Object();
						newColumn.html = columnData;
						newColumn.props = column.style;
						
						//console.log('Styled Column ' + index + ' - ' + columnData);
					} else {
						newColumn = columnData;
						
						//console.log('Simple Column ' + index + ' - ' + columnData);
					}
					
					newColumns.push(newColumn);
				}); 
								
				methods.addRow({ tableID: tableID, row: { props: { id: 'editRow_' + tableID, style: { 'background-color': 'green' } } },  columns: newColumns });
				
				settings.editRecordOptions.row = $('#editRow_' + tableID).html();		

				$('#editRow_' + tableID).remove();
				
				$mainTable.on('clearEditRowColumns', function() {
					var tableID = $(this).attr('id');
					
					var $newRow = $('#editRow_' + tableID);
					
					$newRow.find('.editRowField').each(function(index) {
						//if(!settings.columns[index].defaultValue) { 
							//$(this).val('');
						//}
						if(!settings.columns[index].disabled) { 
							$(this).val('');
						}
					});
				});
				
				$mainTable.on('startEditRow', function() {
					//console.log('start row edit.');
					
					var tableID = $(this).attr('id');
					
					var selector = 'tbody tr';
					if(settings.filterTableOptions.required === true) {
						selector += '.filteredRow';
					}
					
					var $selectedRows = $mainTable.find(selector).find('td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ')').find('input:checkbox:checked'); 
					var totalSelectedRecords = $selectedRows.length;
					
					if(totalSelectedRecords == 1) {
						var $selectedRow = $selectedRows.eq(0).parent().parent();
						
						$selectedRow.addClass('editingRow_' + tableID).hide(); 
						
						var $editRow = $('<tr></tr>').html(settings.editRecordOptions.row).attr('id', 'editRow_' + tableID);
						
						//$(this).prepend($editRow);
						
						$selectedRow.before($editRow);
						
						//console.log('iterating over columns of selected row. checkbox at ' + settings.masterCheckBoxOptions.columnNumber);
						$selectedRow.find('td').each(function(index, column) {
							//console.log('column: ' + $(this).html());							
							if(index != (settings.masterCheckBoxOptions.columnNumber - 1)) {								
								//console.log('setting value for column: ' + $editRow.find('.editRowField').eq(index).html());
								if(settings.columns[index].editable === true) {
									$editRow.find('.editRowField').eq(index).attr('value', $(this).html()); 
								} else {
									$editRow.find('.editRowField').eq(index).attr('value', $(this).html()); 
									$editRow.find('td').eq(index).find('label').html($(this).html()); 
								}
							} else {							
								$editRow.find('.editRowField').eq(index).attr('value', $selectedRows.val());  
							}
						});
						
						//if(settings.paginationRequired) {
							//updatePages(searchTableID);
						//}
						
						$('#editRowAddButton_' + tableID).hide();
						$('#editRowSaveButton_' + tableID).show();
						$('#editRowCancelButton_' + tableID).show();
						
					} else if(totalSelectedRecords > 1) {
						alert('Please Select Only 1 Record.');
					} else {
						alert('Please Select A Record To Update.');
					}			
					
				});
				
				$mainTable.on('cancelEditRow', function() {
					var tableID = $(this).attr('id');
					
					$(this).trigger('clearEditRowColumns');
					
					$('#editRow_' + tableID).remove(); 
					$(this).find('.editingRow_' + tableID).show(); 
					
					$('#editRowCancelButton_' + tableID).hide();				
					$('#editRowSaveButton_' + tableID).hide();
					$('#editRowAddButton_' + tableID).show();
					
					//$(this).trigger('unFreeze');
				});
				
				
				
				$mainTable.on('endEditRow', function() {					
					var tableID = $(this).attr('id');
					
					var $editRow = $('#editRow_' + tableID);
					
					var $finalParams = [];
					
					var params = [];
					
					$.each($editRow.find('.editRowField'), function(index, value) {
						var field = new Object();
						field.name = $(value).attr('id');
						field.value = $(value).attr('value');	

						params.push(field);
					});
					
					if(settings.editRecordOptions.params) {
						finalParams = $.merge( $.merge([], params), settings.editRecordOptions.params);
					} else {
						finalParams = params;
					}					
					
					$.ajax({
						url: settings.editRecordOptions.editURL,
						
						data: finalParams,
						
						beforeSend: function() {
							if(settings.editRecordOptions.beforeSend) {
								return settings.editRecordOptions.beforeSend(params);
							}
						},
						
						success: function(data) {														
							$('#editRowCancelButton_' + tableID).hide();				
							$('#editRowSaveButton_' + tableID).hide();
							$('#editRowAddButton_' + tableID).show();
							
							var newColumns = [];
							$.each(params, function(index, param) {
								var newColProps = {};
								var generateValue = false;
								var colProps = false;
								
								$.each(settings.columns, function(index, columnValue) {
									if(columnValue.name == param.name && columnValue.style) {
										colProps = true;
										if(columnValue.generateStyle) {
											newColProps = columnValue.generateColProps(param.value, data);
										} else {
											newColProps = columnValue.style;
										}
									}
								});
								
								$.each(settings.columns, function(index, columnValue) {
									if(columnValue.name == param.name && columnValue.generate) {
										generateValue = true;
										if(colProps) {
											newColumns.push({html: columnValue.generate(data), props: newColProps });
										} else {
											newColumns.push(columnValue.generate(data));
										}
									}
								});
								
								if(!generateValue) {
									if(colProps) {
										newColumns.push({html: param.value, props: newColProps });
									} else {
										newColumns.push(param.value);
									}
								}
							});							
							
							if(settings.editRecordOptions.row.style) {
								if(settings.editRecordOptions.row.generateStyle) {
									methods.addRow({ tableID: tableID, row: {props: settings.editRecordOptions.row.generateStyle(data)}, columns: newColumns });
								} else {
									methods.addRow({ tableID: tableID, row: {props: rowProps}, columns: newColumns });
								}
							} else {							
								methods.addRow({ tableID: tableID, columns: newColumns });
							}
							
							//if(settings.paginationRequired) {
								//updatePages(searchTableID);
							//} 
														
							$('#' + tableID).trigger('cancelEditRow').find('.editingRow_' + tableID).remove();
							//$(this).find('.editingRow_' + tableID).show(); 
							//clearNewRowColumns();
							
							//$newRow.remove(); 
							
							if(settings.editRecordOptions.success) {
								settings.editRecordOptions.success(data);
							} else {
								alert('Record Saved Successfully.');								
							}
							
							if(settings.paginationOptions.required === true) {
								resetToFirstPage(tableID);
							} 
						},
						
						error: function(msg) {
							if(settings.editRecordOptions.error) {
								settings.editRecordOptions.error(msg);
							} else {
								alert('The following error occurred while saving changes to the record: ' + msg.statusText);
							}
						},
						
						complete: function() {
							if(settings.editRecordOptions.complete) {
								settings.editRecordOptions.complete();		
							}
						},

						dataType: 'json',
						
						cache: false
					});
				});
				
			},
			
			
			
			/**
			* Adds the functionality of inserting new rows into the table. 
			*/
			newRecordInsertion: function(tableID) {			
				//console.log('Adding new record functionality.');
				
				var $searchTable = $('#' + tableID);
				
				loadTableSettings(tableID);					
				
				var $newRowButtonsDiv = $('<span></span>').attr('id', 'newRowadditionalControls_' + tableID);
				
				var addButtonLabel = 'New';
				if(settings.newRowOptions.addButton) {
					addButtonLabel = settings.newRowOptions.addButton;
				}				
				
				var $addButton = $('<button type="button"></button>').attr('id', 'newRowAddButton_' + tableID).addClass('tableUtils_imageButton');
				var $saveButton = $('<button type="button"></button>').attr('id', 'newRowSaveButton_' + tableID).addClass('tableUtils_imageButton').hide();
				var $cancelButton = $('<button type="button"></button>').attr('id', 'newRowCancelButton_' + tableID).addClass('tableUtils_imageButton').hide();
				
				$addButton.append($('<img alt="New">').attr('title', addButtonLabel).attr('src', settings.contextRoot + settings.resourcesDir + '/add7.png').addClass('tableUtils_imageButton'));
				$saveButton.append($('<img alt="Save" title="Save">').attr('src', settings.contextRoot + settings.resourcesDir + '/ok1.png').addClass('tableUtils_imageButton'));
				$cancelButton.append($('<img alt="Cancel" title="Cancel">').attr('src', settings.contextRoot + settings.resourcesDir + '/no3.png').addClass('tableUtils_imageButton'));
				
				$addButton.on('click', function() {
					$searchTable.trigger('startNewRowInsert');
				});
				
				$saveButton.on('click', function() {
					$searchTable.trigger('endNewRowInsert');
				});
				
				$cancelButton.on('click', function() {
					$searchTable.trigger('cancelNewRowInsert');					
				});
				
				$newRowButtonsDiv.append($addButton);
				$newRowButtonsDiv.append($saveButton);
				$newRowButtonsDiv.append($cancelButton);
				
				$('#additionalControls_' + tableID).append($newRowButtonsDiv); 
								
				var newColumns = [];
				
				//console.log('Adding new row.');
				
				$.each(settings.columns, function(index, column) {
					var $newCell = $('<span></span>');
					
					var $inputElement = null;
					if(column.type === 'text' || column.type === 'label') {
						$inputElement = $('<input>');
						$inputElement.attr('type', 'text');							
					} else if(column.type === 'select') {
						$inputElement = $('<select></select>');
						//$inputElement.attr('type', 'text');
						
						$.each(column.options, function(index, option) {
							$inputElement.append('<option>', {text: option.text, value: option.value});
						});
					}											
					
					$inputElement.attr('id', column.name);
					$inputElement.attr('title', 'Enter ' + column.label);
					
					$inputElement.css('width', '100%');
					
					//console.log('Before Check Default value: ' + column.defaultValue);
					if(column.defaultValue) {
						$inputElement.attr('value', column.defaultValue); 
						//console.log('Default value: ' + column.defaultValue);
					}
					
					if(column.disabled) {
						$inputElement.attr('disabled', true);
					}
					
					$inputElement.addClass('newRowField');
					
					$newCell.append($inputElement);
					
					if(column.type === 'label') {
						$inputElement.hide();
						$newCell.append('<label>' + column.displayValue + '</label>');
					}
					
					var newColumn = null;
					
					var columnData = $newCell.html();
					
					if(column.style) {
						newColumn = new Object();
						newColumn.html = columnData;
						newColumn.props = column.style;
						
						//console.log('Styled Column ' + index + ' - ' + columnData);
					} else {
						newColumn = columnData;
						
						//console.log('Simple Column ' + index + ' - ' + columnData);
					}
					
					newColumns.push(newColumn);
				}); 
								
				methods.addRow({ tableID: tableID, row: { props: { id: 'newRow_' + tableID, style: { 'background-color': 'green' } } },  columns: newColumns });
				
				settings.newRowOptions.row = $('#newRow_' + tableID).html();		

				$('#newRow_' + tableID).remove();
				
				$searchTable.on('clearNewRowColumns', function() {
					var tableID = $(this).attr('id');
					
					var $newRow = $('#newRow_' + tableID);
					
					$newRow.find('.newRowField').each(function(index) {
						if(!settings.columns[index].defaultValue) { 
							$(this).val('');
						}
					});
				});
				
				$searchTable.on('cancelNewRowInsert', function() {
					var tableID = $(this).attr('id');
					
					$(this).trigger('clearNewRowColumns');
					
					$('#newRow_' + tableID).remove();
					
					$('#newRowCancelButton_' + tableID).hide();				
					$('#newRowSaveButton_' + tableID).hide();
					$('#newRowAddButton_' + tableID).show();
					
					//$(this).trigger('unFreeze');
				});
				
				$searchTable.on('startNewRowInsert', function() {
					var tableID = $(this).attr('id');
					
					var $newRow = $('<tr></tr>').html(settings.newRowOptions.row).attr('id', 'newRow_' + tableID);
					
					$(this).prepend($newRow);
					
					//if(settings.paginationRequired) {
						//updatePages(searchTableID);
					//}
					
					$('#newRowAddButton_' + tableID).hide();
					$('#newRowSaveButton_' + tableID).show();
					$('#newRowCancelButton_' + tableID).show();
					
					//$(this).trigger('freeze');
				});
				
				$searchTable.on('endNewRowInsert', function() {					
					var tableID = $(this).attr('id');
					
					var $newRow = $('#newRow_' + tableID);
					
					var $finalParams = [];
					
					var params = [];
					
					$.each($newRow.find('.newRowField'), function(index, value) {
						var field = new Object();
						field.name = $(value).attr('id');
						field.value = $(value).attr('value');	

						params.push(field);
					});
					
					if(settings.newRowOptions.params) {
						finalParams = $.merge( $.merge([], params), settings.newRowOptions.params);
					} else {
						finalParams = params;
					}					
					
					$.ajax({
						url: settings.newRowOptions.addURL,
						
						data: finalParams,
						
						beforeSend: function() {
							if(settings.newRowOptions.beforeSend) {
								return settings.newRowOptions.beforeSend(params);
							}
						},
						
						success: function(data) {														
							$('#newRowCancelButton_' + tableID).hide();				
							$('#newRowSaveButton_' + tableID).hide();
							$('#newRowAddButton_' + tableID).show();
							
							var newColumns = [];
							$.each(params, function(index, param) {
								var newColProps = {};
								var generateValue = false;
								var colProps = false;
								
								$.each(settings.columns, function(index, columnValue) {
									if(columnValue.name == param.name && columnValue.style) {
										colProps = true;
										if(columnValue.generateStyle) {
											newColProps = columnValue.generateColProps(param.value, data);
										} else {
											newColProps = columnValue.style;
										}
									}
								});
								
								$.each(settings.columns, function(index, columnValue) {
									if(columnValue.name == param.name && columnValue.generate) {
										generateValue = true;
										if(colProps) {
											newColumns.push({html: columnValue.generate(data), props: newColProps });
										} else {
											newColumns.push(columnValue.generate(data));
										}
									}
								});
								
								if(!generateValue) {
									if(colProps) {
										newColumns.push({html: param.value, props: newColProps });
									} else {
										newColumns.push(param.value);
									}
								}
							});							
							
							if(settings.newRowOptions.row.style) {
								if(settings.newRowOptions.row.generateStyle) {
									methods.addRow({ tableID: tableID, row: {props: settings.newRowOptions.row.generateStyle(data)}, columns: newColumns });
								} else {
									methods.addRow({ tableID: tableID, row: {props: rowProps}, columns: newColumns });
								}
							} else {							
								methods.addRow({ tableID: tableID, columns: newColumns });
							}
							
							//if(settings.paginationRequired) {
								//updatePages(searchTableID);
							//} 
														
							$('#' + tableID).trigger('cancelNewRowInsert');
							
							//clearNewRowColumns();
							
							//$newRow.remove(); 
							
							if(settings.newRowOptions.success) {
								settings.newRowOptions.success(data);
							} else {
								alert('New Record Inserted Successfully.');								
							}
							
							if(settings.paginationOptions.required === true) {
								resetToFirstPage(tableID);
							} 
						},
						
						error: function(msg) {
							if(settings.newRowOptions.error) {
								settings.newRowOptions.error(msg);
							} else {
								alert('The following error occurred while inserting the new row: ' + msg.statusText);
							}
						},
						
						complete: function() {
							if(settings.newRowOptions.complete) {
								settings.newRowOptions.complete();		
							}
						},

						dataType: 'json',
						
						cache: false
					});
					
					
					
				});
				
				saveTableSettings(tableID);				
			}	
		};
		
		
		/**
		* Add a new filter. 
		*/
		updateFilter = function(tableID, index, filterValue, filterType) {
			//console.log('Updating filter for: ' + tableID + ', column: ' + index);
			
			loadTableSettings(tableID);
			
			settings.filterTableOptions.activeFilters = $.grep(settings.filterTableOptions.activeFilters, function(filter, indexInArray) {
				return (index === filter.columnIndex);
			}, true);
			
			//console.log('After grep: ' + settings.filterTableOptions.activeFilters.length);
			
			if((filterType === 'checkbox' && filterValue === true) || (filterType !== 'checkbox' && filterValue.length > 0)) {
				var newFilter = {
					columnIndex: index,
					columnName: settings.columns[index].value,
					expr: filterValue,
					type: filterType
				};
				
				settings.filterTableOptions.activeFilters.push(newFilter);
				
				//console.log('Filter updated.');
			}
			
			var filters = new Array();
			$.each(settings.filterTableOptions.activeFilters, function(index, filter) {
				filters.push(settings.columns[filter.columnIndex].label + '(' + filter.expr + ')'); 
			});
			
			var filtersList = filters.join(', ');
			
			saveTableSettings(tableID);
			
			//console.log(settings.filterTableOptions.activeFilters.length + ' active filters.');
			
			if(settings.filterTableOptions.activeFilters.length > 0) {
				settings.filterTableOptions.message.message = '<b>' + settings.filterTableOptions.activeFilters.length + '</b> Filter(s) Active. Filtering on: <b>' + filtersList + '</b>.';
				pushMessage(tableID, settings.filterTableOptions.message); 
			} else {
				popMessage(tableID, settings.filterTableOptions.message);
			}
			
			
			if(settings.paginationOptions.serverSide === false) {
				applyFilter(tableID);			
			} else {
				resetToFirstPage(tableID);
			}
			
			$('#' + settings.masterCheckBoxOptions.masterCheckBox).attr('checked', false).trigger('hideControls');	
		};	


		/**
		* Update sorting. 
		*/ 
		updateSortInfo = function(tableID, index, sortType) {
			//console.log('Updating sort info for: ' + tableID + ', column: ' + index);
			
			loadTableSettings(tableID);
			
			var sortingUp = true;
			
			if(settings.sortOptions.sortingState.columnIndex) {
				if(settings.sortOptions.sortingState.columnIndex == index) {
					sortingUp = !settings.sortOptions.sortingState.sortUp;
				}
			} 			
			
			settings.sortOptions.sortingState = {
				columnIndex: index,
				columnName: settings.columns[index].value, 
				sortUp: sortingUp,
				type: sortType
			};
			
			saveTableSettings(tableID);
			
			//console.log('sorting active on header: ' + settings.sortOptions.sortingState.columnIndex);
			
			//if(settings.filterTableOptions.activeFilters.length > 0) {
				settings.sortOptions.message.message = 'Sorting on: <b>' + settings.columns[settings.sortOptions.sortingState.columnIndex].label + '</b>(' + ( (settings.sortOptions.sortingState.sortUp === true) ? 'Asc' : 'Desc') + ').';
				pushMessage(tableID, settings.sortOptions.message); 
			//} else {
				//(tableID, settings.filterTableOptions.message);
			//}
			
			if(settings.paginationOptions.serverSide === false) {
				applySort(tableID);	
			} else {
				resetToFirstPage(tableID);
			}
		};
		
		
		saveTableSettings = function(tableID) {
			for(var i=0; i<settings.tableSettings.length; i++) {
				if(settings.tableSettings[i].tableID === tableID) {					
					settings.tableSettings.splice(i,1);
				}
			} 
			
			var settingsForTable = new Object();			
			
			settingsForTable.tableID = tableID;	
			settingsForTable.columns = settings.columns;
			settingsForTable.rowSelectOptions = settings.rowSelectOptions;
			settingsForTable.fixHeaderOptions = settings.fixHeaderOptions;
			settingsForTable.filterTableOptions = settings.filterTableOptions;
			settingsForTable.masterCheckBoxOptions = settings.masterCheckBoxOptions;
			settingsForTable.sortOptions = settings.sortOptions;
			settingsForTable.paginationOptions = settings.paginationOptions;			
			settingsForTable.newRowOptions = settings.newRowOptions;
			settingsForTable.deleteRecordsOptions = settings.deleteRecordsOptions;
			settingsForTable.editRecordOptions = settings.editRecordOptions;
			settingsForTable.contextRoot = settings.contextRoot;
			settingsForTable.resourcesDir = settings.resourcesDir;	
			settingsForTable.buttons = settings.buttons;
						
			settings.tableSettings[settings.tableSettings.length] = settingsForTable;
		};
		
		
		loadTableSettings = function(tableID) {
			//console.log('Looking for the settings of: ' + tableID);
			
			var settingsForTable = {};
			var settingsFound = false;
			
			for(var i=0; i<settings.tableSettings.length; i++) {
				if(settings.tableSettings[i].tableID === tableID) {
					settingsForTable = settings.tableSettings[i];
					settingsFound = true;
					//console.log('Settings found: ' + settingsForTable.tableID);
				}
			}
			
			if(settingsFound === true) {
			
				settings.tableID = settingsForTable.tableID;
				settings.columns = settingsForTable.columns;
				settings.rowSelectOptions = settingsForTable.rowSelectOptions;
				settings.fixHeaderOptions = settingsForTable.fixHeaderOptions;
				settings.filterTableOptions = settingsForTable.filterTableOptions;
				settings.masterCheckBoxOptions = settingsForTable.masterCheckBoxOptions;
				settings.sortOptions = settingsForTable.sortOptions;
				settings.paginationOptions = settingsForTable.paginationOptions;
				settings.newRowOptions = settingsForTable.newRowOptions;
				settings.deleteRecordsOptions = settingsForTable.deleteRecordsOptions;				
				settings.editRecordOptions = settingsForTable.editRecordOptions;	
				settings.contextRoot = settingsForTable.contextRoot;
				settings.resourcesDir = settingsForTable.resourcesDir;	
				settings.buttons = settingsForTable.buttons;				
				
				return true;
			} else {
				//console.log('Settings not found for table: ' + tableID);
				return false;
			}
			
		};
		
		
		hasVerticalScrollBar = function(element) {
			return $(element).scrollHeight > $(element).height(); 
		};
		
		
		
		adjustTableWidth = function(tableID) {
			loadTableSettings(tableID);
			
			var $table = $('#' + tableID);
			
			if(hasVerticalScrollBar($('#mainTableWrapper_' + tableID))) {
				$($table).css({width: settings.globalWidth + 5 + 'px'});
				//console.log('incr');
			} else {
				$($table).css({width: settings.globalWidth - 5 + 'px'});
				//console.log('desr');
			}
		};
		
		
		printSettings = function() {	
		
			//console.log('settings.pageSize: ' + settings.rowSelectOptions);
			//console.log('settings.numberOfPageLinks: ' + settings.fixHeaderOptions);
			//console.log('settings.displayPagesCount: ' + settings.filterTableOptions);
			//console.log('settings.currentPage: ' + settings.masterCheckBoxOptions);
			//console.log('settings.availablePageSizes: ' + settings.sortOptions);
			//console.log('settings.fixedHeaderTable: ' + settings.paginationOptions);
			//console.log('settings.globalWidth: ' + settings.newRowOptions);
			//console.log('settings.updateURL: ' + settings.editRowOptions);
					
		};
		
		
		applyFilter = function(tableID) {
			//console.log('Filtering callback: ' + tableID);
			
			loadTableSettings(tableID);
			
			var $tableToFilter = $('#' + tableID);
			
			var $fixedHeaderTable = $('#' + settings.fixHeaderOptions.fixedHeaderTable);
			
			var $rows = $tableToFilter.find('tbody tr').addClass('filteredRow').show();
			
			var $headers = $fixedHeaderTable.find('thead tr th');
						
			//console.log($headers.length + ' headers.');
						
			var resetFilters = (settings.filterTableOptions.activeFilters.length > 0) ? false : true;
					
			$.each(settings.filterTableOptions.activeFilters, function(index, filter) {
				//console.log('Applying filter on header: ' + filter.columnIndex + '. filtering for: ' + filter.expr);
				
				$rows.each(function(index) {
					var $this = $(this);
					
					var columnValue = null;					
					
					if(filter.type === 'checkbox') {
						columnValue = $this.find('td:nth-child(' + (filter.columnIndex + 1) + ')').find('input:checkbox').is(':checked');
						
						if(columnValue !== filter.expr) {								
							$this.removeClass('filteredRow');
							$this.hide();								
						}						
					} else if(filter.type === 'numeric') {
						columnValue = $.trim($this.find('td:nth-child(' + (filter.columnIndex + 1) + ')').text());
						
						if(filter.expr != columnValue) {
							$this.removeClass('filteredRow');
							$this.hide();
						}
					} else {
						columnValue = $.trim($this.find('td:nth-child(' + (filter.columnIndex + 1) + ')').text());
						
						var pattern = new RegExp(filter.expr, 'i');	
						
						if(pattern.test(columnValue) === false) {								
							$this.removeClass('filteredRow');
							$this.hide();							
						}						
					}					
					
					//console.log('filtered on: ' + filter.expr + ' - columnValue: ' + columnValue);
					
				});		
			}); 	
			
			if(resetFilters === true) {
				$rows.show();
			}
			
			//console.log('resetFilters: ' + resetFilters);
			
			applyTableStyling(tableID);
			
			resetToFirstPage(tableID); 
			
			//updateChildrenCheckBoxes(tableID);
		};
		
		
		
		getAttributes = function(element) {
			var attr_arr = [];
			for (var i = 0; i < element.attributes.length; i++){
			    var attribute = {};
			    attribute.name = element.attributes[i].name;
			    attribute.value = element.attributes[i].value;
			    
			    //if(attribute.value !== null && attribute.value !== 'null' && attribute.value.length > 0) {
			    	if(attribute.name === 'id' || attribute.name === 'align' || attribute.name === 'class' || attribute.name === 'width' || attribute.name === 'style') {
			    		//alert('pushing - ' + attribute.name + ': ' + attribute.value);
			    		attr_arr.push(attribute);
			    	}
			    //}
			}		
			
			return attr_arr;
		};
		
		
		applyAttributes = function(element, attributesList) {
			$.each(attributesList, function() {				
				//alert('popping - ' + this.name + ': ' + this.value);
				if(this.name === 'style') {
					$(element).css(this.value);
				} else {
					$(element).attr(this.name, this.value);
				}
			});
		};
		
		/**
		 * Convert object to html. 
		 */
		objectToTable = function(objectArray, table) {
			
			var body = $('tbody', table);
			
			body.find('tr').remove();
			
			for (var i = 0; i < objectArray.length; i++){
				
				tr = $('<tr></tr>');
				
				applyAttributes(tr, objectArray[i].rowAttributes);
				
				for (var j=0 ; j<objectArray[i].rowData.length ; j++){
					var cell = $('<td></td>').html(objectArray[i].rowData[j].val);
					applyAttributes(cell, objectArray[i].rowData[j].attributes);
					tr.append(cell);
				}
				
				body.append(tr);
				
				//$.each(objectArray[i].rowAttributes, function() {
					//if(this.name === 'class') {
						//var matches = this.value.match(/filteredRow/i);
						//if(matches === null || matches === 'null') {
							//tr.hide();
						//}
					//}
				//});
			}
		};
		
		/**
		 * Convert html to object. 
		 */
		tableToObject = function(table) {

			var objectArray = [];
			
			$('tbody tr', table).each(function(i){
				var row = new Object();
				
				var rowAttributes = getAttributes(this);
				
				var rowData = [];
				
				$('td', this).each(function(j){
					var col = new Object();
					
					col.val = $(this).html();
					col.attributes = getAttributes(this); 
					
					rowData[j] = col;		
				})
				
				row.rowData = rowData;
				row.rowAttributes = rowAttributes;
				
				objectArray.push(row);
			});	

			return objectArray;
		};
		
		
		applySort = function(tableID) {
			
			//console.log('Sorting callback: ' + tableID);
			
			loadTableSettings(tableID);
			
			var $mainTable = $('#' + tableID);
			
			var $fixedHeaderTable = $('#' + settings.fixHeaderOptions.fixedHeaderTable);
			
			var $rows = $mainTable.find(settings.sortOptions.eligibleRowsSelector);
			
			var $headers = $fixedHeaderTable.find('thead tr th');
							
			var sortingIndex = settings.sortOptions.sortingState.columnIndex;
			
			var sortingUp = settings.sortOptions.sortingState.sortUp;
			
			var $sortingHeaderLink = $headers.eq(sortingIndex).find('a');
			
			if(sortingUp === true) {
				$sortingHeaderLink.addClass('tableUtils_sortUp');
			} else {
				$sortingHeaderLink.addClass('tableUtils_sortDown');
			}
			
			//console.log('sortingUp: ' + sortingUp);
			
			var sortFunction = null;
			if(settings.sortOptions.sortingState.type === 'numeric') {
				//console.log('numeric sorting');
				sortFunction = function(a, b) {
					var x = Number($.trim(String(a.rowData[sortingIndex].val)));
					var y = Number($.trim(String(b.rowData[sortingIndex].val)));
					
					//console.log('comparing: ' + x + ' - ' + y + '. x >= y: ' + (x >= y));
					
					if(sortingUp === true) {
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					} else {
						return ((x > y) ? -1 : ((x < y) ? 1 : 0));
					}					
				};
			} else if(settings.sortOptions.sortingState.type === 'float') {
				//console.log('float sorting');
				sortFunction = function(a, b) {
					var x = parseFloat($.trim(String(a.rowData[sortingIndex].val)));					
					var y = parseFloat($.trim(String(b.rowData[sortingIndex].val)));

					//console.log('comparing: ' + x + ' - ' + y + '. x >= y: ' + (x >= y));					
					
					if(sortingUp === true) {
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					} else {
						return ((x > y) ? -1 : ((x < y) ? 1 : 0));
					}					
				};
			} else if(settings.sortOptions.sortingState.type === 'alphanumeric') {
				//console.log('alphanumeric sorting');
				sortFunction = function(a, b) {
					var x = $.trim(String(a.rowData[sortingIndex].val).toLowerCase());
					var y = $.trim(String(b.rowData[sortingIndex].val).toLowerCase());
					
					//console.log('comparing: ' + x + ' - ' + y + '. x >= y: ' + (x >= y));
					
					if(sortingUp === true) {
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					} else {
						return ((x > y) ? -1 : ((x < y) ? 1 : 0));
					}		
				};
			}
				
			var objectTable = tableToObject($mainTable);
				
			objectTable.sort(sortFunction);	
				
			objectToTable(objectTable, $mainTable);
			
			$mainTable.trigger('tableUpdated');
			
			if(settings.filterTableOptions.required === true) {
				applyFilter(tableID);
				applyTableStyling(tableID);
			}
			
			resetToFirstPage(tableID);	

			//updateChildrenCheckBoxes(tableID);			
		};
		
		
		
		selectAllItems = function(tableID) {
			loadTableSettings(tableID);			
			
			var selector = 'tbody tr';
			
			if(settings.filterTableOptions.required === true) {
				selector += '.filteredRow';
			}
			
			var $mainTable = $('#' + tableID);
			
			var $rows = $mainTable.find(selector);
			
			var $checkboxes = $rows.find('td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ')').find('input:checkbox');
			
			$checkboxes.each(function(index) {
				$(this).attr('checked', true);
				$(this).trigger('change'); 
			});	
			
			$('#' + settings.masterCheckBoxOptions.masterCheckBox).attr('checked', true);	

			updateSelectedRecords(tableID);	
			
			//if(isMasterCheckBoxChecked === true) {
				//$('#masterCBAdditionalControls_' + tableID).show();
			$('#selectAllItemsControl_' + tableID).hide();
			$('#deSelectAllItemsControl_' + tableID).show();				
			//}
			
		};
		
		
		
		deSelectAllItems = function(tableID) {
			loadTableSettings(tableID);			
			
			var selector = 'tbody tr';
			
			if(settings.filterTableOptions.required === true) {
				selector += '.filteredRow';
			}
			
			var $mainTable = $('#' + tableID);
			
			var $rows = $mainTable.find(selector);
			
			var $checkboxes = $rows.find('td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ')').find('input:checkbox');
			
			$checkboxes.each(function(index) {
				$(this).attr('checked', false);
				$(this).trigger('change'); 
			});	
			
			$('#' + settings.masterCheckBoxOptions.masterCheckBox).attr('checked', false);			

			updateSelectedRecords(tableID);	
			
			//$('#selectAllItemsControl_' + tableID).hide();
			$('#deSelectAllItemsControl_' + tableID).hide();
			$('#masterCBAdditionalControls_' + tableID).hide();			
		};
		
		
		
		
		updateSelectedRecords = function(tableID) {
			loadTableSettings(tableID);
			
			var $mainTable = $('#' + tableID);
			
			var selector = 'tbody tr';
			if(settings.filterTableOptions.required === true) {
				selector += '.filteredRow';
			}
			var totalSelectedRecords = $mainTable.find(selector).find('td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ')').find('input:checkbox:checked').length; 
			
			if(totalSelectedRecords > 0) {			
				settings.masterCheckBoxOptions.message.message = '<b>' + totalSelectedRecords + '</b> Item(s) Selected.';
				pushMessage(tableID, settings.masterCheckBoxOptions.message); 
			} else {
				popMessage(tableID, settings.masterCheckBoxOptions.message); 
			}
			
			saveTableSettings(tableID);
		};
		
		
		
		updateChildrenCheckBoxes = function(tableID) {
			if(settings.masterCheckBoxOptions.required === true) {
				loadTableSettings(tableID);
				var isMasterCheckBoxChecked = $('#' + settings.masterCheckBoxOptions.masterCheckBox).is(':checked');
				if(isMasterCheckBoxChecked === true) {
					toggleChildrenCheckBoxes(tableID, isMasterCheckBoxChecked); 
				} 
			}
		}; 
		
		
		/**
		* Toggles children check boxes depending on the value of master check box. 		
		*/
		toggleChildrenCheckBoxes = function(tableID, isMasterCheckBoxChecked) {			
			//console.log('Master checkbox changed: ' + tableID);
			
			loadTableSettings(tableID);
			
			var $mainTable = $('#' + tableID);	
			
			var $eligibleCheckBoxes = $mainTable.find(settings.masterCheckBoxOptions.eligibleRowsSelector).find('td:nth-child(' + (settings.masterCheckBoxOptions.columnNumber) + ')').find('input:checkbox');
			
			//console.log('eligibleRowsSelector: ' + settings.masterCheckBoxOptions.eligibleRowsSelector);
			//console.log('num: ' + $eligibleCheckBoxes.length); 
			
			$eligibleCheckBoxes.each(function(index) {
				$(this).attr('checked', isMasterCheckBoxChecked);
				//console.log('toggling');
				if(isMasterCheckBoxChecked) {
					$(this).parent().parent().addClass('tableUtils_selectedRow');					
				} else {
					$(this).parent().parent().removeClass('tableUtils_selectedRow');
				}
			}); 

			updateSelectedRecords(tableID);	
			
			if(isMasterCheckBoxChecked === true) {
				$('#' + settings.masterCheckBoxOptions.masterCheckBox).trigger('showControls');			
			} else {				
				$('#' + settings.masterCheckBoxOptions.masterCheckBox).trigger('hideControls');					
			}

			saveTableSettings(tableID);
		};
		
		
		/**
		* Callback function when a checkbox is value is toggled. 
		*/ 
		childCheckBoxToggledHandler = function(tableID) {		
			//console.log('Children checkbox changed: ' + tableID);
			
			loadTableSettings(tableID);
			
			var $mainTable = $('#' + tableID);
			
			var $eligibleCheckBoxCells = $mainTable.find(settings.masterCheckBoxOptions.eligibleRowsSelector).find('td:nth-child(' + settings.masterCheckBoxOptions.columnNumber + ')');
			
			var $allCheckBoxes = $eligibleCheckBoxCells.find('input:checkbox');
			var $checkedCheckBoxes = $eligibleCheckBoxCells.find('input:checkbox:checked');
			
			var $masterCheckBox = $('#' + settings.masterCheckBoxOptions.masterCheckBox);
			
			var totalNumberOfRecords =  $allCheckBoxes.length; 
			var numberOfSelectedRecords = $checkedCheckBoxes.length;
			
			if(numberOfSelectedRecords == 0) {
				$masterCheckBox.attr('checked', false);
			} else if(numberOfSelectedRecords == totalNumberOfRecords) {
				$masterCheckBox.attr('checked', true);
			} else {
				$masterCheckBox.attr('checked', false);
			}					
			
			updateSelectedRecords(tableID);	
			
			saveTableSettings(tableID);
		}; 
		
		
		/**
		* Callback function when a radio button is clicked. 
		*/ 
		radioButtonClickEvent = function() {
			methods.getSelectedItem();			
		};
			
		
		
		
		
		resetToFirstPage = function(tableID) {
			goToPage(tableID, 1); 
			updateSelectedRecords(tableID);
		};
		
			
		updatePageSize = function(tableID) {
			loadTableSettings(tableID);
			settings.paginationOptions.pageSize = $('#pageSizeSelect_' + tableID).attr('value');
			$('#' + settings.masterCheckBoxOptions.masterCheckBox).attr('checked', false).trigger('hideControls');			
			//console.log('new page size: ' + settings.pageSize);
			saveTableSettings(tableID);
			
			resetToFirstPage(tableID);
		};	
		
		
		updatePageLinks = function(tableID) {
		
			loadTableSettings(tableID);
			
			var $mainTable = $('#' + tableID);
				
			var numRows = $mainTable.find(settings.paginationOptions.eligibleRowsSelector).length;
		
			if(settings.paginationOptions.serverSide === true) {
				numRows = settings.paginationOptions.totalRows;
			}
			
			var recordsOnThisPage = $mainTable.find(settings.paginationOptions.eligibleRowsSelector + '.currentPageRow').length;
		
			var numberOfPageLinks = settings.paginationOptions.numberOfPageLinks;
		
			var currentPage = settings.paginationOptions.currentPage; 

			var firstPage = ( ((currentPage-1) - ((currentPage-1)%settings.paginationOptions.displayPagesCount)) + 1 );	// The first page to display. 
			var lastPage = ( firstPage + settings.paginationOptions.displayPagesCount - 1);	// The last page to display.
			
			for(var page=1; page<=numberOfPageLinks; page++) {
				var $pageLinkContent = $('#paginationPage_' + tableID + '_' + page);
				if(page>=firstPage && page<=lastPage) {					
					$pageLinkContent.show();
				} else {
					$pageLinkContent.hide();
				}
				
				if(page == currentPage) {
					$pageLinkContent.removeClass('tableUtils_paginationLink');
					$pageLinkContent.addClass('tableUtils_paginationLinkSelected');
				} else {
					$pageLinkContent.removeClass('tableUtils_paginationLinkSelected');
					$pageLinkContent.addClass('tableUtils_paginationLink');
				}
			}
			

			if(currentPage == 1) {
					//console.log('first page. prev link: ' + $('#prevLink_' + tableID).html());
				$('#prevLink_' + tableID).find('a').attr('disabled', true);
			} else { 
				$('#prevLink_' + tableID).find('a').attr('disabled', false);
			}
			
			if(currentPage == settings.paginationOptions.numberOfPageLinks) {
				//console.log('last page. next link: ' + $('#nextLink_' + tableID).html());
				$('#nextLink_' + tableID).find('a').attr('disabled', true);
			} else { 
				$('#nextLink_' + tableID).find('a').attr('disabled', false);
			}
			
			
			if(settings.paginationOptions.type !== 'numeric') {
				$('#recordsOnThisPageInfo_' + tableID).html('<b>' + recordsOnThisPage + '</b>'); 
				$('#pageSizeInfo_' + tableID).hide();
			} else {
				$('#recordsOnThisPageInfo_' + tableID).hide(); 
				$('#pageSizeInfo_' + tableID).html('<b>' + settings.paginationOptions.pageSize + '</b>'); 
			}
			
			$('#currentPageInfo_' + tableID).html('<b>' + currentPage + '</b> of ' + numberOfPageLinks); 
			$('#totalRecordsInfo_' + tableID).html('<b>' + numRows + '</b>'); 			
		
			saveTableSettings(tableID);	
			
		};
		
		
		createLinks = function(tableID) {
			//console.log('creating links for: ' + tableID);
			
			loadTableSettings(tableID);
			
			var $mainTable = $('#' + tableID);
			
			var $rows = $mainTable.find(settings.paginationOptions.eligibleRowsSelector);
			
			var $links = $('<span></span>');
			
			if(settings.paginationOptions.type === 'numeric') {
				var numRows = $rows.length;
				
				if(settings.paginationOptions.serverSide === true) {
					numRows = settings.paginationOptions.totalRows; 
				}
				
				//console.log('total rows: ' + numRows);
				
				var pageSize = settings.paginationOptions.pageSize;
			
				var numberOfPageLinks = Math.ceil(numRows / pageSize);
				
				settings.paginationOptions.numberOfPageLinks = numberOfPageLinks;
				
								
				var $prevLinkContent = $('<span class="tableUtils_paginationLink"></span>').attr('id', 'prevLink_' + tableID);
				var $prevLink = $('<a href="#">Prev</a>');
				$prevLink.on('click', function() {
					previousPage(tableID);
				});
				$prevLinkContent.append($prevLink);				
				$links.append($prevLinkContent);
				
				
				for(var page=1; page<=numberOfPageLinks; page++) {
					
					//console.log('creating page link: ' + page);
					var $pageLinkContent = $('<span class="tableUtils_paginationLink"></span>').attr('id', 'paginationPage_' + tableID + '_' + page);
					var $pageLink = $('<a href="#" onclick="goToPage(\'' + tableID + '\', '+ page + ')">' + page + '</a>');
					
					$pageLinkContent.append($pageLink);				
					$links.append($pageLinkContent);						
					
				}
				
				
				var $nextLinkContent = $('<span class="tableUtils_paginationLink"></span>').attr('id', 'nextLink_' + tableID);
				var $nextLink = $('<a href="#">Next</a>');
				$nextLink.on('click', function() {
					nextPage(tableID);
				});
				$nextLinkContent.append($nextLink);				
				$links.append($nextLinkContent);
				
				var $pageSelect = $('#pageSelect_' + tableID);
				$pageSelect.empty();
				for(var page = 1; page<= numberOfPageLinks; page++) {
					$pageSelect.append($('<option>', {
						text: page, value: page
					}));
				}				
				$pageSelect.val(settings.paginationOptions.currentPage);
				
			
			} else if(settings.paginationOptions.type === 'alphabetic' || settings.paginationOptions.type === 'alphanumeric') {
							
				var numberOfPageLinks = 26;
				if(settings.paginationOptions.type === 'alphanumeric') {
					numberOfPageLinks = 36;
				} 
				
				//console.log('no of pages: ' + numberOfPageLinks);
				
				settings.paginationOptions.numberOfPageLinks = numberOfPageLinks;				
				
				var $prevLinkContent = $('<span class="tableUtils_paginationLink"></span>').attr('id', 'prevLink_' + tableID);
				var $prevLink = $('<a href="#">Prev</a>');
				$prevLink.on('click', function() {
					previousPage(tableID);
				});
				$prevLinkContent.append($prevLink);				
				$links.append($prevLinkContent);
				
				
				for(var page=1; page<=numberOfPageLinks; page++) {
					
					var $pageLinkContent = $('<span class="tableUtils_paginationLink"></span>').attr('id', 'paginationPage_' + tableID + '_' + page);
					var $pageLink = $('<a href="#" onclick="goToPage(\'' + tableID + '\', '+ page + ')">' + settings.paginationOptions.pageMappings[page] + '</a>');
					
					$pageLinkContent.append($pageLink);				
					$links.append($pageLinkContent);						
					
				}
				
				
				var $nextLinkContent = $('<span class="tableUtils_paginationLink"></span>').attr('id', 'nextLink_' + tableID);
				var $nextLink = $('<a href="#">Next</a>');
				$nextLink.on('click', function() {
					nextPage(tableID);
				});
				$nextLinkContent.append($nextLink);				
				$links.append($nextLinkContent);
				
				var $pageSelect = $('#pageSelect_' + tableID);
				$pageSelect.empty();
				for(var page = 1; page<= numberOfPageLinks; page++) {
					$pageSelect.append($('<option>', {
						text: settings.paginationOptions.pageMappings[page], value: page
					}));
				}
				$pageSelect.val(settings.paginationOptions.currentPage);
			}						
			
			
			var $paginationLinks = $('#paginationLinks_' + tableID);
			
			$($paginationLinks).empty();
			
			$($paginationLinks).append($links);
			
			saveTableSettings(tableID);
			
		};
		
		
		goToPage = function(tableID, pageNumber) {
			loadTableSettings(tableID);
			if(settings.paginationOptions.required === true) {
				if(settings.paginationOptions.serverSide === false) {								
					if(pageNumber == 1) {
						createLinks(tableID);
					}
					if(showPage(tableID, pageNumber) == 0 && (settings.paginationOptions.type === 'alphabetic' || settings.paginationOptions.type === 'alphanumeric')) {
				
						settings.paginationOptions.message.message = 'No records found on this Page.';
						pushMessage(tableID, settings.paginationOptions.message); 
				
						//var nextPage = pageNumber + 1;
						//if(nextPage > 0 && nextPage <= settings.paginationOptions.numberOfPageLinks) {
							//console.log('No records found for page: ' + settings.paginationOptions.pageMappings[pageNumber] + '. Showing page: ' + settings.paginationOptions.pageMappings[nextPage]);
							//goToPage(tableID, nextPage);
						//}
					} else {
						popMessage(tableID, settings.paginationOptions.message);
					}
				} else {
					fetchPage(tableID, pageNumber); 
				}
				applyTableStyling(tableID); 
			}
		}
		
		
		showPage = function(tableID, pageNumber) {
			//console.log('showing page: ' + pageNumber + ' for: ' + tableID);
			
			loadTableSettings(tableID);
			
			var rowsOnPage = 0;
			
			//console.log('no of pages: ' + settings.paginationOptions.numberOfPageLinks);
			if(pageNumber > 0 && pageNumber <= settings.paginationOptions.numberOfPageLinks) {
				
				
				settings.paginationOptions.currentPage = pageNumber;				
				
				var $mainTable = $('#' + tableID); 
			
				var $rows = $mainTable.find(settings.paginationOptions.eligibleRowsSelector);
				
				var numRows = $rows.length;
				
				var pageSize = settings.paginationOptions.pageSize;
				
				//console.log('numRows: ' + numRows);
				
				if(settings.paginationOptions.type === 'numeric') {					
					var startRow = ((pageNumber - 1) * pageSize) + 1;
					//console.log('startRow: ' + startRow);
					
					var endRow = Number(startRow) + Number(pageSize);
					//console.log('endRow: ' + endRow);
					
					for(var i=0; i<numRows; i++) {
						if((i+1)>=startRow && (i+1)<endRow) {
							$rows.eq(i).addClass('currentPageRow');
							$rows.eq(i).show();
							rowsOnPage++;
						} else {
							$rows.eq(i).removeClass('currentPageRow');
							$rows.eq(i).hide();
						}
					}					
				} else if(settings.paginationOptions.type === 'alphabetic' || settings.paginationOptions.type === 'alphanumeric') {					
					//console.log('alphanumeric filtering');
					
					var pageMappings = settings.paginationOptions.pageMappings;
					
					
					for(var i=0; i<numRows; i++) {
						//console.log('row: ' + i);
						var columnValue = $.trim($rows.eq(i).find('td:nth-child(' + settings.paginationOptions.columnIndex + ')').text()).substring(0, 1).toUpperCase();
						//console.log(settings.paginationOptions.columnIndex + ' column value: ' + columnValue);
						if(columnValue === pageMappings[pageNumber]) {
							$rows.eq(i).addClass('currentPageRow');
							$rows.eq(i).show();
							rowsOnPage++;
						} else {
							$rows.eq(i).removeClass('currentPageRow');
							$rows.eq(i).hide();
						}
					}
				}
				
				saveTableSettings(tableID);
				
				updatePageLinks(tableID);				
			}
			
			return rowsOnPage;
			//updateChildrenCheckBoxes(tableID);
			
		};
		
		
		previousPage = function(tableID) {
			loadTableSettings(tableID);
			
			goToPage(tableID, settings.paginationOptions.currentPage - 1);
		};
		
		
		nextPage = function(tableID) {
			loadTableSettings(tableID);
			
			goToPage(tableID, settings.paginationOptions.currentPage + 1);
		};
		
		
		firstPage = function(tableID) {
			goToPage(tableID, 1);
		};
		
		
		lastPage = function(tableID) {
			loadTableSettings(tableID);
			
			goToPage(tableID, settings.paginationOptions.numberOfPageLinks);
		};
		
		
		/**
		* Fetches a page of record. 
		*/
		fetchPage = function(tableID, page) {
			
			// The parameters we need to pass for fetching the page. 
			var fetchQueryParameters = {
				//fieldNames: settings.columns,
				pageSize: settings.paginationOptions.pageSize,				
				currentPage: page, 
				start: (((page-1) * settings.paginationOptions.pageSize)),
				end: (page * settings.paginationOptions.pageSize),
				sortingDetails: settings.sortOptions.sortingState,	 				
				filteringDetails: settings.filterTableOptions.activeFilters,
				type: settings.paginationOptions.type,
				columnIndex: settings.paginationOptions.columnIndex
			};
			
			
			// Make an ajax call to fetch the page. 
			$.ajax({
			
				// The url from where data will be fetched. 
				url: settings.paginationOptions.fetchUrl, 
				
				// The query parameters that will be passed with the request. 
				data: { params: JSON.stringify(fetchQueryParameters) },	
				
				// Any pre-processing to be done before making the request. 
				beforeSend: function() {	
					settings.paginationOptions.message.message = '<i>Fetching Records, please wait...</i>';
					settings.paginationOptions.message.block = true;
					pushMessage(tableID, settings.paginationOptions.message); 
					$('#outermostDiv_' + tableID).attr('disabled', true);
					// Show the loading notification. 
					//$('#loadingNotificationIcon_paginate').fadeIn('fast');					
				}, 	
				
				// Callback to be called after the page is fetched. 
				success: function(data) {
					// If the request was executed successfully, then update the pagination information in the settings array. 
					settings.paginationOptions.currentPage = fetchQueryParameters.currentPage;
					settings.paginationOptions.start = fetchQueryParameters.start;
					settings.paginationOptions.end = fetchQueryParameters.end;										
					settings.paginationOptions.fetchedData = data; 
					
					if(data && data.length>0) {
						settings.paginationOptions.totalRows = data[0].totalRows; 
					} else {
						settings.paginationOptions.totalRows = 0; 
					}
					
					saveTableSettings(tableID);
					
					createLinks(tableID); 
					updatePageLinks(tableID);
					
					deSelectAllItems(tableID);
					
					// Reset page related data. 
					//reset();
					
					// Update the table with contents of newly fetched page. 
					populateTable(tableID, data); 
					
					$('#' + tableID).trigger('tableUpdated');
					
					// Update the pagination links. 
					//updateLinks();
					
					// Update the pagination information. 
					//updatePaginationInformation(); 
					
					// Hide the loading notification. 
					//$('#loadingNotificationIcon_paginate').fadeOut('fast');
				}, 	
				
				complete: function() {
					popMessage(tableID, settings.paginationOptions.message);
					$('#outermostDiv_' + tableID).attr('disabled', false);
				},
				
				// Type of data to be returned from server. 
				dataType: 'json',
				
				// Do not cache the request. 
				cache: false
			});			
		};
		
		
		/**
		* Populates the table with newly fetced rows. 
		*/
		populateTable = function(tableID, data) {			 			
			// Clear all rows previously present in the table. 
			var $mainTable = $('#' + tableID); 
						
			//console.log('Rows before populating table: ' + $mainTable.find('tbody tr').length);
			
			$mainTable.find('tbody').empty();
			
			//console.log('Rows before clearing table: ' + $mainTable.find('tbody tr').length);
			
			$.each(data, function(index, row) {
				var newColumns = [];
				
				//console.log('Creating row: ' + index);
				
				$.each(settings.columns, function(index, column) {
					var newColumn = null;
					
					var columnData = '';
					if(column.generate) {
						columnData = column.generate(row);
					} else {
						columnData = row[column.name];
					}
					
					if(column.style) {
						newColumn = new Object();
						newColumn.html = columnData;
						newColumn.props = column.style;
						
						//console.log('Styled Column ' + index + ' - ' + columnData);
					} else {
						newColumn = columnData;
						
						//console.log('Simple Column ' + index + ' - ' + columnData);
					}
					
					newColumns.push(newColumn);
				}); 
				
				methods.addRow({ tableID: tableID, columns: newColumns });
			});			
					
		};
		
		
		
		clearMessagesInterval = function(tableID) {
			loadTableSettings(tableID);
			
			clearInterval(settings.fixHeaderOptions.messageLoop);
			
			settings.fixHeaderOptions.messageLoop = setInterval( function() { updateMessages(tableID); }, settings.fixHeaderOptions.messageLoopInterval);
			
			saveTableSettings(tableID);
		};
		
		
		setNextMessage = function(tableID, message) {
			loadTableSettings(tableID);
			
			var nextMsgIndex = -1;
			$.each(settings.fixHeaderOptions.messages, function(index, msg) {
				if(message.type === msg.type) {
					nextMsgIndex = index;
				}
			});
			
			settings.fixHeaderOptions.nextMessageIndex = nextMsgIndex;
			
			saveTableSettings(tableID);			
		}; 
		
		
		pushMessage = function(tableID, message) {
			loadTableSettings(tableID);
			
			//console.log('pushing message: ' + message.type);			
			settings.fixHeaderOptions.messages = $.grep(settings.fixHeaderOptions.messages, function(msg, msgIndex) {
				return (msg.type === message.type);
			}, true);
			
			settings.fixHeaderOptions.messages.push(message);
			
			saveTableSettings(tableID);
			
			setNextMessage(tableID, message);
			
			clearMessagesInterval(tableID);
			
			updateMessages(tableID);
			
		}; 
		
		
		popMessage = function(tableID, message) {
			loadTableSettings(tableID);
			
			settings.fixHeaderOptions.messages = $.grep(settings.fixHeaderOptions.messages, function(msg, msgIndex) {
				return (msg.type === message.type);
			}, true);
			
			settings.fixHeaderOptions.nextMessageIndex = 0;
			
			saveTableSettings(tableID);
			
			clearMessagesInterval(tableID);
			
			updateMessages(tableID);
		}; 
		
		
		
		
		
		updateMessages = function(tableID) {
			loadTableSettings(tableID);
			
			var msgs = settings.fixHeaderOptions.messages;
			
			var numMsgs = msgs.length;
			
			//console.log('Total msgs in queue: ' + numMsgs);
			
			var $messagesArea = $('#' + settings.fixHeaderOptions.messagesArea);
			
			if(numMsgs > 0) {		
				var nextMsgIndex = settings.fixHeaderOptions.nextMessageIndex;
				
				//console.log('Showing msg: ' + nextMsgIndex);
				
				$messagesArea.hide();
				$messagesArea.html(msgs[nextMsgIndex].message);					
				$messagesArea.fadeIn();
				
				if(msgs[nextMsgIndex].block) {
					//console.log('Message: ' + nextMsgIndex + ' blocked');
					settings.fixHeaderOptions.nextMessageIndex = nextMsgIndex;
				} else {
					nextMsgIndex = (nextMsgIndex + 1) % numMsgs;
					settings.fixHeaderOptions.nextMessageIndex = nextMsgIndex;
				}
				
				//console.log('Next msg: ' + nextMsgIndex);
				
				if(numMsgs == 1) {
					clearInterval(settings.fixHeaderOptions.messageLoop);
				}
				
				saveTableSettings(tableID);
			} else {
				//console.log('No more msgs'); 
				$messagesArea.html('');		
				$messagesArea.hide();
				clearInterval(settings.fixHeaderOptions.messageLoop);
			}
			
			saveTableSettings(tableID);
		};
		
		
		logOffset = function() {
			var $elementOffset = $('#pluginTestNode').offset();
			//console.log('Element Position -- ');
			//console.log('top: ' + $elementOffset.top);
			//console.log('left: ' + $elementOffset.left);
		}
		
		applyTableStyling = function(tableID) {
			$('#' + tableID).find('tbody tr').removeClass('evenRow').removeClass('oddRow');
			$('#' + tableID).find('tbody tr:even').addClass('evenRow');
			$('#' + tableID).find('tbody tr:odd').addClass('oddRow'); 
		}		
		
		/**
		* This is where calls from pages come. Calls requested functions appropriately. 
		*/ 
		$.fn.tableutils = function( method ) {
			// If the method parameter is present, then call the method, else call the default method i.e. init. 
			if( methods[method] ) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if ( !method || typeof method === 'object' ) {
				return methods.init.apply(this, arguments); 
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.paginate');
			}
		}; 
	}
) (jQuery) ;

