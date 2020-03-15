SELECT groups.caption 'city', gn.node_id, gn.group_id, nodes.caption 'title', nodes.status, nodes.interface, nodes.admin, na.application_id, applications.caption 'lang', statuses.color, statuses.description, users.firstname, users.lastname, users.email, interfaces.caption 'caption', interfaces.status 'interface_status'
FROM groups
JOIN groups_nodes gn
ON gn.group_id = groups.id
JOIN nodes
ON gn.node_id = nodes.id
JOIN nodes_applications na
ON nodes.id = na.node_id
JOIN applications
ON na.application_id = applications.id
JOIN statuses
ON nodes.status = statuses.id
LEFT JOIN interfaces
ON nodes.interface = interfaces.id - 1
JOIN users
ON nodes.admin = users.id