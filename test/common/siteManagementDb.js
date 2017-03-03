var db = require('./sqlDb');
var util = require('util');

var siteViewMapQuery = "select svmn.id as NavMapNodeId, svmn.NodeType as NavMapScopeNodeType, svmn.ParentSiteViewMapId as NavMapNodeParentMapId, svmn.BreadCrumb, svmn.UrlFragment, svmn.IsUrlFragmentSuppressed, svmn.MapState, svmn.CreatedById as NavMapNodeCreatedBy, svmn.LastModifiedById as NavMapNodeLastModifiedBy, svmn.CreatedDate as NavMapNodeCreatedTs, svmn.LastModifiedDate as NavMapNodeLastModifiedTs, svmn.BreadCrumbUrlOverride, svmn.IsBreadCrumbSuppressed, svmn.IsDynamic, smv.id as ScopeMapNodeId, smv.name as ScopemapName, smv.DisplayName as ScopemapDisplayName, smv.ContentQuery, smv.MapState, smv.CreatedById as ScopeMapCreatedBy, smv.LastModifiedById as ScopeMapLastModifiedBy, smv.CreatedDate as ScopeMapCreatedTs, smv.LastModifiedDate as ScopeMapLastmodifiedTs from dbo.siteviewmapnode svmn, dbo.scopemapnode smv where svmn.nodeid = smv.id and svmn.id = %s and svmn.mapstate = %s and smv.mapstate = %s";

module.exports.getSiteVieMapNodeInfo = function(id, mapState)
{
   return Promise.resolve(
       db.executeQuery(util.format(siteViewMapQuery, id, mapState, mapState))
        .then(function (result) {
            return result;
        }));
};
