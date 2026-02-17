
frontend flow for group creation and adding members
    1. POST /group
    2. Get group_id
    3. For each member:
        POST /member


route for group update
    /group/:id
route to delete group
    /group/:id
get all groups 
    /group
get one group
    /group/:id

for members 
    post - /member
get all members 
    member/:group_id

get mem by id
    member/:id

for expenses
    post /expense 
get expense by id
    /expense/event/:event_id
update expense
    /expense/:id


