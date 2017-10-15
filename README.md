# thrift-n-spin_server

# API Requirements
---

## ERD
---

![](https://www.lucidchart.com/publicSegments/view/4ec45503-f5c4-49f0-bed5-127c26f8f335/image.png)


## API
---

### POST /api/notification

### Body of request:

* message
	* optional
	* type: string
	* max length 140 characters
* type
	* required
	* type: string
 	* valid values:
 		"change_machine_empty", "broken_machine", "other"

### Added by server:

* created
	* type: datetime
	* default value: set when created
