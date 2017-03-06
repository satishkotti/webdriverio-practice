var db = require('./sqlDb');
var util = require('util');

var siteViewMapQuery = "select svmn.id as NavMapNodeId, svmn.NodeType as NavMapScopeNodeType, svmn.ParentSiteViewMapId as NavMapNodeParentMapId, svmn.BreadCrumb, svmn.UrlFragment, svmn.IsUrlFragmentSuppressed, svmn.MapState, svmn.CreatedById as NavMapNodeCreatedBy, svmn.LastModifiedById as NavMapNodeLastModifiedBy, svmn.CreatedDate as NavMapNodeCreatedTs, svmn.LastModifiedDate as NavMapNodeLastModifiedTs, svmn.BreadCrumbUrlOverride, svmn.IsBreadCrumbSuppressed, svmn.IsDynamic, smn.id as ScopeMapNodeId, smn.name as ScopemapName, smn.DisplayName as ScopemapDisplayName, smn.ContentQuery, smn.MapState, smn.CreatedById as ScopeMapCreatedBy, smn.LastModifiedById as ScopeMapLastModifiedBy, smn.CreatedDate as ScopeMapCreatedTs, smn.LastModifiedDate as ScopeMapLastmodifiedTs from dbo.siteviewmapnode svmn, dbo.scopemapnode smn where svmn.nodeid = smn.id and svmn.id = %s and svmn.mapstate = %s and smn.mapstate = %s";

var scopeMap = 'Select * from dbo.ScopeMap where id=%s';
var siteViewMap = 'Select * from dbo.SiteViewMap where id=%s';

module.exports.getSiteVieMapNodeInfo = function(id, mapState)
{
   return Promise.resolve(
       db.executeQuery(util.format(siteViewMapQuery, id, mapState, mapState))
        .then(function (result) {
            return result;
        }));
};

module.exports.getScopeVieMap = function(id)
{
    //get scopeMap details by site id
   return Promise.resolve(
       db.executeQuery(util.format(scopeMap, id))
        .then(function (result) {
            return result;
        }));
};

module.exports.getSiteViewMap = function(id)
{
    //get siteViewMap details by site id
   return Promise.resolve(
       db.executeQuery(util.format(siteViewMap, id))
        .then(function (result) {
            return result;
        }));
};


