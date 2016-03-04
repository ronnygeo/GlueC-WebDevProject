Open Issues:
-   Side Nav Not working due to include as the element is not present in the DOM.


Angular Filter Package

https://www.npmjs.com/package/angularjs-filters

- Usage 

### [Installation](#installation)

    bower install angularjs-filters

### [String Filters](#string-filters)

<table>

<tbody>

<tr>

<th>Filter</th>

<th>Usage</th>

<th>Result</th>

</tr>

<tr>

<td>_**format**_</td>

<td>_'Hello {0}. What are you been doing this {1}?' | string.format : 'Sam' : 'evening'_</td>

<td>_Hello Sam. What are you been doing this evening?_</td>

</tr>

<tr>

<td>_**html2string**_</td>

<td>_'Hello <br/>. How are you?' | string.html2string_</td>

<td>_Hello . How are you?_</td>

</tr>

<tr>

<td>_**shorten**_</td>

<td>_'A long story cut into short' | string.shorten : 12_</td>

<td>_A long story..._</td>

</tr>

<tr>

<td>_**replace**  
String Replace. Pattern can be a string or regex_</td>

<td>_'Hello Mr How are you doing' | string.replace : 'Mr': 'Sir'_  
_"hello help"| string.replace:"he[a-z]{2}":"Yell"_</td>

<td>_Hello Sir How are you doing_  
_Yello Yell_</td>

</tr>

<tr>

<td>_**camelcase**_</td>

<td>_'A long story cut into short' | string.camelcase_</td>

<td>_A Long Story Cut Into Short_</td>

</tr>

<tr>

<td>_**lowercase**_</td>

<td>_'Convert to LOWERCASE' | string.lowercase_</td>

<td>_convert to lowercase_</td>

</tr>

<tr>

<td>_**uppercase**_</td>

<td>_'uppercase all' | string.uppercase_</td>

<td>_UPPERCASE ALL_</td>

</tr>

<tr>

<td>_**trim, trimstart, trimend**  
String Trim Functions_</td>

<td>_' Hello Mr. ' | string.trim_</td>

<td>_Hello Mr._</td>

</tr>

</tbody>

</table>

### [Array Filters](#array-filters)

<table>

<tbody>

<tr>

<th>Filter</th>

<th>Usage</th>

<th>Result</th>

</tr>

<tr>

<td>_**join**_</td>

<td>_['Hello','Mr.','How','Are','You?'] | array.join : '-'_</td>

<td>_Hello-Mr.-How-Are-You?_</td>

</tr>

<tr>

<td>_**reverse**_</td>

<td>_ng-repeat='["Banana", "Orange", "Apple", "Mango"] | array.reverse'_</td>

<td>_"Mango","Apple","Orange", "Banana"_</td>

</tr>

</tbody>

</table>

### [Math Filters](#math-filters)

<table>

<tbody>

<tr>

<th>Filter</th>

<th>Usage</th>

<th>Result</th>

</tr>

<tr>

<td>_**max**_</td>

<td>_[8, 1, 2, 3, 7] | math.max_</td>

<td>_8_</td>

</tr>

<tr>

<td>_**min**_</td>

<td>_[8, 1, 2, 3, 7] | math.min_</td>

<td>_1_</td>

</tr>

</tbody>

</table>

### [Boolean Filters](#boolean-filters)

<table>

<tbody>

<tr>

<th>Filter</th>

<th>Usage</th>

<th>Result</th>

</tr>

<tr>

<td>_**YesNo**  
Converts boolean value to Yes/No_</td>

<td>_A == B | binary.YesNo_</td>

<td>_Yes/No?_</td>

</tr>

</tbody>

</table>

### [Debug Filters](#debug-filters)

<table>

<tbody>

<tr>

<th>Filter</th>

<th>Usage</th>

<th>Result</th>

</tr>

<tr>

<td>_**print**  
Debug prints the bound value_</td>

<td>_'MyValue' | debug.print_</td>

<td>_MyValue_</td>

</tr>

</tbody>

</table>

### [Unit Testing](#unit-testing)