var db = require('./../db/sqlDb');
var util = require('util');

var siteViewMapQuery = "select svmn.id as NavMapNodeId, svmn.NodeType as NavMapScopeNodeType, svmn.ParentSiteViewMapId as NavMapNodeParentMapId, svmn.BreadCrumb, svmn.UrlFragment, svmn.IsUrlFragmentSuppressed, svmn.MapState, svmn.CreatedById as NavMapNodeCreatedBy, svmn.LastModifiedById as NavMapNodeLastModifiedBy, svmn.CreatedDate as NavMapNodeCreatedTs, svmn.LastModifiedDate as NavMapNodeLastModifiedTs, svmn.BreadCrumbUrlOverride, svmn.IsBreadCrumbSuppressed, svmn.IsDynamic, smn.id as ScopeMapNodeId, smn.name as ScopemapName, smn.DisplayName as ScopemapDisplayName, smn.ContentQuery, smn.MapState, smn.CreatedById as ScopeMapCreatedBy, smn.LastModifiedById as ScopeMapLastModifiedBy, smn.CreatedDate as ScopeMapCreatedTs, smn.LastModifiedDate as ScopeMapLastmodifiedTs from dbo.siteviewmapnode svmn, dbo.scopemapnode smn where svmn.nodeid = smn.id and svmn.id = %s and svmn.mapstate = %s and smn.mapstate = %s";

var scopeMap = 'Select * from dbo.ScopeMap where id=%s';
var siteViewMap = 'Select * from dbo.SiteViewMap where id=%s';

var sitevieMapNodeLayoutByDisplayName = "Select svmn.*, n.* from dbo.NodeLayOut n, dbo.siteviewmapnode svmn where svmn.id=n.ChildNodeId " + 
                            "and n.mapstate=svmn.mapstate and svmn.nodeId in (select id from dbo.scopemapnode smn where smn.DisplayName='%s') " +
                            "and n.nodeType in (2,4)";

var scopeMapNodeLayoutByDisplayName = "Select sc.*, n.* from dbo.NodeLayOut n, dbo.scopemapnode sc " +
                         "where n.ChildNodeId=sc.id and n.mapstate=sc.mapstate and sc.DisplayName='%s' and n.nodeType=1";

module.exports = {
    getSiteVieMapNodeInfo: function(id, mapState) {
        return db.executeQuery(util.format(siteViewMapQuery, id, mapState, mapState));
    },
    getScopeVieMap: function(id){
        return db.executeQuery(util.format(scopeMap, id));
    },
    getSiteViewMap: function(id)
    {
        return db.executeQuery(util.format(siteViewMap, id));
    },
    getSitevieMapNodeLayoutByDisplayName: function(displayName)
    {
        return db.executeQuery(util.format(sitevieMapNodeLayoutByDisplayName, displayName));
    },
    getscopeMapNodeLayoutByDisplayName: function(displayName)
    {
        return db.executeQuery(util.format(scopeMapNodeLayoutByDisplayName, displayName));
    }
}

